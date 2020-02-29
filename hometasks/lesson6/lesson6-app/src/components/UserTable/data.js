import faker from 'faker'

export const data = Array.from({ length: 20 })
    .map((_, idx) => {
      return {
        uuid: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
      }
    })