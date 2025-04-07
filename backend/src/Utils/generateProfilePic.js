export const generateProfilePic = (firstName, lastName) => {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=512?bold=true?format=svg`;
};

export default generateProfilePic;
