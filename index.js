const { Client } = require("pg");
const crypto = require("crypto");

function decryptValue(encryptedValue, iv) {
  if (encryptedValue.length < 4) {
    return null;
  } else {
    const AES_SECRET = "H+MbQeUhViYq4t6w9z$C&F)J@NERfVaW";
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      AES_SECRET,
      Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(encryptedValue, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

const client = new Client({
  host: "localhost",
  user: "akash.r",
  port: 5433,
  password: "password",
  databse: "akash.r",
});

client.connect();

// client.query(`select * from public."DmsUserData"`, (err, res) => {
client.query(
  `select pan_card_number, last_name, first_name, dob, aadhar_card_number, mobile, email, fathers_name, init_vector from public."DmsUserData"`,
  (err, res) => {
    if (!err) {
      dataParse(res.rows);
      // console.log(result);
    } else {
      console.log(err.message);
    }
    client.end;
  }
);

let result = [];

function dataParse(data) {
  let decryptedValues = {
    first_name: null,
    last_name: null,
    fathers_name: null,
    email: null,
    mobile: null,
    dob: null,
    pan_card_number: null,
    aadhar_card_number: null,
  };
  const jsonLength = Object.keys(data).length;
  for (let i = 0; i < jsonLength; i++) {
    decryptedValues.first_name = decryptValue(
      data[i]["first_name"],
      data[i]["init_vector"]
    );
    decryptedValues.last_name = decryptValue(
      data[i]["last_name"],
      data[i]["init_vector"]
    );
    decryptedValues.fathers_name = decryptValue(
      data[i]["fathers_name"],
      data[i]["init_vector"]
    );
    decryptedValues.email = decryptValue(
      data[i]["email"],
      data[i]["init_vector"]
    );
    decryptedValues.mobile = decryptValue(
      data[i]["mobile"],
      data[i]["init_vector"]
    );
    decryptedValues.dob = decryptValue(data[i]["dob"], data[i]["init_vector"]);
    decryptedValues.pan_card_number = decryptValue(
      data[i]["pan_card_number"],
      data[i]["init_vector"]
    );
    decryptedValues.aadhar_card_number = decryptValue(
      data[i]["aadhar_card_number"],
      data[i]["init_vector"]
    );

    // Output data
    console.log(decryptedValues);

    // Store in Array
    result.push(decryptedValues);
  }
}
