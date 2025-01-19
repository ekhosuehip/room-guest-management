class Room {
    // Static property
    static roomTypes = [
      { type: "SINGLE", price: 55.99, availableRooms: 5 },
      { type: "DOUBLE", price: 75.99, availableRooms: 3 },
      { type: "DELUXE", price: 95.99, availableRooms: 2 },
    ];
  
    // Constructor for Room instances
    constructor(roomNumber, roomType) {
      const roomTypeObj = Room.roomTypes.find(
        (room) => room.type === roomType.toUpperCase()
      );
      if (roomTypeObj) {
        if (roomTypeObj.availableRooms <= 0) {
          throw new Error(`No available rooms of type: ${roomType}.`);
        }
        roomTypeObj.availableRooms -= 1;
      } else {
        throw new Error(`Invalid room type: ${roomType}.`);
      }
  
      this.roomNumber = roomNumber;
      this.roomType = roomTypeObj.type;
      this.price = roomTypeObj.price;
    }
  
    // Static method to check room availability
    static roomAvailability() {
      return Room.roomTypes.map(
        (room) =>
          `Type: ${room.type}, Price: $${room.price}, Availability: ${room.availableRooms}`
      );
    }
  
    // Method to get room details
    getDetails() {
      return `Room Number: ${this.roomNumber}, Type: ${this.roomType}, Price: $${this.price}`;
    }
}
  
class Guest {
    // Static properties
    static totalGuests = 0;
    static allBookedRooms = [];

    // Constructor for Guest instance
    constructor(name, age) {
        if (age < 18) {
        console.log(`Only adults allowed. ${name} not registered.`);
        return;
        }
        this.name = name;
        this.age = age;
        Guest.totalGuests += 1;
        this.bookedRooms = [];
    }

    // Method for booking a room
    bookRoom(roomType) {
        const roomTypeObj = Room.roomTypes.find(
        (room) => room.type === roomType.toUpperCase()
        );

        if (!roomTypeObj) {
        console.log(`Invalid room type: ${roomType}.`);
        return;
        }

        if (roomTypeObj.availableRooms <= 0) {
        console.log(`No available rooms of type: ${roomType}.`);
        return;
        }

        const roomNumber = `${roomTypeObj.type}-${roomTypeObj.availableRooms}`;
        const newRoom = new Room(roomNumber, roomType);
        this.bookedRooms.push(newRoom);

        Guest.allBookedRooms.push(newRoom);

        console.log(`Room ${roomNumber} successfully booked by ${this.name}.`);
    }

    // Static method to view all booked rooms by all guests
    static viewAllBookedRooms() {
       console.log(Guest.allBookedRooms)
    }
}
