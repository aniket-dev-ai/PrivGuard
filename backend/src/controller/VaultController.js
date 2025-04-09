import User from "../Model/UserModel.js";
import VaultItem from "../Model/VaultModel.js";
import { encrypt, decrypt } from "../Utils/encryptor.js";

// 👉 Create Vault Item
export const createVaultItem = async (req, res) => {
  try {
    const { title, website, username, password, notes } = req.body;
    console.log(website, username, password);

    console.log("Encrypting password:", password);
    const encrypted = encrypt(password);
    console.log("Encrypted Password:", encrypted);

    const item = new VaultItem({
      userId: req.user._id,
      title,
      website,
      username,
      password: JSON.stringify(encrypted),
      notes,
    });

    console.log("Saving item:", item);

    await item.save();
    console.log("Item saved:", item);
    res.status(201).json({ msg: "Item saved successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// 👉 Get All Vault Items
export const getVaultItems = async (req, res) => {
  try {
    const items = await VaultItem.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    const decryptedItems = items.map((item) => {
      const decryptedPass = decrypt(JSON.parse(item.password));
      return {
        ...item._doc,
        password: decryptedPass,
      };
    });

    res.json(decryptedItems);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// 👉 Delete Item
export const deleteVaultItem = async (req, res) => {
  try {
    console.log("Deleting item with ID:", req.params.id);
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await VaultItem.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};

export const createMasterKey = async (req, res) => {
  console.log("Creating master key...");
  try {
    console.log("Creating master key...");
    const { masterKey } = req.body;
    console.log("Master Key:", masterKey);

    const encrypted = encrypt(masterKey);
    console.log("Encrypted Master Key:", encrypted);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.masterKey = JSON.stringify(encrypted);
    console.log("User before saving:", user.masterKey);
    user.hasKey = true;
    console.log("User after setting hasKey:", user.hasKey);

    await user.save();
    console.log("Master key saved:");

    res.status(201).json({ msg: "Master key saved successfully" , user}); 
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const checkMasterKey = async (req, res) => {
  console.log("Checking master key...");
  try {
    const { masterKey } = req.body;
    console.log("Master Key:", masterKey);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const encryptedMasterKey = user.masterKey;
    console.log("Encrypted Master Key:", encryptedMasterKey);
    const decryptedMasterKey = decrypt(JSON.parse(encryptedMasterKey));
    console.log("Decrypted Master Key:", decryptedMasterKey);
    if (masterKey === decryptedMasterKey) {
      console.log("Master key is correct");
      return res
        .status(200)
        .json({ success: true, msg: "Master key is correct" });
    } else {
      console.log("Master key is incorrect");
      return res
        .status(401)
        .json({ success: false, msg: "Invalid master key" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
