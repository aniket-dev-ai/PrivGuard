import generateFakeData from "../Utils/generateFakeData.js"

export const FakeDatagenerator =async (req, res) => {
    const fakeData = await  generateFakeData()
    console.log(fakeData)
    res.status(200).json({ fakeData })
}