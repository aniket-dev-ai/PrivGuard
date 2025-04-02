import { Faker, es } from "@faker-js/faker";

const generateFakeData = () => {
  const faker = new Faker({ locale: [es] });
  const fakeData = [];

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
    phoneNumber: faker.phone.number(),
  };
  fakeData.push(user);
 
  return fakeData;
};

export default generateFakeData;
