const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors(
  //{
  //origin: 'http://localhost:59613/', // Your Angular app's URL
  //}
));

// Static folder for file serving
app.use('/uploads', express.static('uploads'));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Signup Route
app.post('/signup', async (req, res) => {
  // const { username, password, email } = req.body;
  const { firstname, lastname, email, username, password } = req.body;

  try {
    console.log(firstname, lastname, email, username, password);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('BEGIN');
    //Fetch next value from sequence
    const seq = await pool.query('SELECT nextval(\'custom_case_no\') AS nextval');
    const nextval = seq.rows[0].nextval;


    // Insert the new user into the database
    const result = await pool.query(
      //'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      'INSERT INTO users_demo (firstname, lastname, email, username, password, caseno) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',

      //[username, password, email]
      [firstname, lastname, email, username, hashedPassword, nextval]
    );

    await pool.query('COMMIT');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


//Find User by email/username
// const findUserByEmail = async (email) => {
//     const result = await pool.query('SELECT * FROM users_demo WHERE email = $1', [email]);
//    console.log(result.rows[0]);
//    console.log("end of finduser");

//     return result.rows[0];
//   };


// Login Route

app.post('/login', async (req, res) => {
  // const { username, password, email } = req.body;
  console.log(req.body);

  const { email, password } = req.body;

  try {
    console.log("validating" + email);
    console.log("validating" + password);
    console.log(req.body);
    // const user = await findUserByEmail(email);
    const user = await User.findUserByEmail(email);

    if (!user) {
      console.log("validating email");

      return res.status(400).json({ message: 'User not found' });
    }
    console.log("start" + password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("end" + isMatch);

    if (!isMatch) {
      console.log("validating password");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    //  res.json({message: "Login Successful", token });
    return res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    console.error(err.message);
    // res.status(500).send('Server error');
    //res.status(500).json({ message: 'Server error' });
    return res.status(500).json({ error: err.message });
  }
});



//Search API
app.get('/search', async (req, res) => {
  const caseNo = req.query.case_no; // Get the case number from query parameters

  if (!caseNo) {
    return res.status(400).json({ error: 'Case number is required' });

  }
  try {
    const query = 'SELECT caseno, firstname, lastname, email from users_demo where caseno = $1';
    const values = [caseNo];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No records found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/submit-form', async (req, res) => {
  const { firstName, middleName, lastName, suffix, maidenName,
    nickName, dob, ssnItin, gender, race, relationshipToChild,
    cpAlternativeFirstName, cpAlternativeMiddleName, cpAlternativeLastName,
    cpAlternativeSuffix, mailing_address_source, mailing_address_international_address,
    mailing_address_addressLine1, mailing_address_addressLine2, mailing_address_city,
    mailing_address_state, mailing_address_county, mailing_address_zipcode,
    mailing_address_country, residential_address_source,
    residential_address_international_address, residential_address_addressLine1,
    residential_address_addressLine2, residential_address_city,
    residential_address_state, residential_address_county,
    residential_address_zipcode, residential_address_country,
    residential_address_homePhone, residential_address_businessPhone,
    residential_address_cellPhone, residential_address_email,
    nearest_relative_relationship, nearest_relative_firstName,
    nearest_relative_lastName, nearest_relative_phone, relative_address_source,
    relative_address_international_address, relative_address_addressLine1,
    relative_address_addressLine2, relative_address_city, relative_address_state,
    relative_address_county, relative_address_zipcode, relative_address_country,
    familyViolence, employer_info_employed, incom_info_type,
    incom_info_frequency, incom_info_amount, currentTcaRecipient,
    currentMaRecipient, formerTcaRecipient, formerMaRecipient, tcaApplicant,
    maApplicant, finacialStatemet, serviceFee, attorney_firstName,
    attorney_middleName, attorney_lastName, attorney_phone, attorney_source,
    attorney_interNationalAddress, attorney_addressLine1, attorney_addressLine2,
    attorney_city, attorney_state, attorney_county, attorney_zipcode,
    attorney_country } = req.body;
  // const formData = req.body;

  try {

    await pool.query('BEGIN');
    const result = await pool.query(
      `INSERT INTO form_data (first_name, middle_name, last_name, suffix, maiden_name, nick_name, dob, 
        ssn_itin, gender, race, relationship_to_child,
        cp_alternative_first_name, cp_alternative_middle_name, cp_alternative_last_name, cp_alternative_suffix,
        mailing_address_source, mailing_address_international_address, mailing_address_address_line1, 
        mailing_address_address_line2, mailing_address_city, mailing_address_state, mailing_address_county, 
        mailing_address_zipcode, mailing_address_country, residential_address_source, 
        residential_address_international_address, residential_address_address_line1, 
        residential_address_address_line2, residential_address_city, residential_address_state, 
        residential_address_county, residential_address_zipcode, residential_address_country, 
        residential_address_home_phone, residential_address_business_phone, residential_address_cell_phone, 
        residential_address_email, nearest_relative_relationship, nearest_relative_first_name, 
        nearest_relative_last_name, nearest_relative_phone, relative_address_source, 
        relative_address_international_address, relative_address_address_line1, relative_address_address_line2, 
        relative_address_city, relative_address_state, relative_address_county, relative_address_zipcode, 
        relative_address_country, family_violence, employer_info_employed, incom_info_type, incom_info_frequency, 
        incom_info_amount, current_tca_recipient, current_ma_recipient, former_tca_recipient, former_ma_recipient, 
        tca_applicant, ma_applicant, finacial_statement, service_fee, attorney_first_name, attorney_middle_name, 
        attorney_last_name, attorney_phone, attorney_source, attorney_international_address, 
        attorney_address_line1, attorney_address_line2, attorney_city, attorney_state, attorney_county, 
        attorney_zipcode, attorney_country
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 
    $8, $9, $10, $11,
    $12, $13, $14, $15,
    $16, $17, $18, $19, $20, $21, $22, $23, 
    $24, $25, $26, $27, $28, $29, $30, 
    $31, $32, $33, $34, $35, $36, $37, $38, $39,
    $40, $41, $42, $43, $44, $45, $46, $47, $48, 
    $49, $50, $51, $52, $53, $54, $55, $56, 
    $57, $58, $59, $60, $61, $62, $63, $64, 
    $65, $66, $67, $68, $69, $70, $71, $72, $73, 
    $74, $75, $76) RETURNING id;`,
      [firstName, middleName, lastName, suffix, maidenName,
        nickName, dob, ssnItin, gender, race, relationshipToChild,
        cpAlternativeFirstName, cpAlternativeMiddleName, cpAlternativeLastName,
        cpAlternativeSuffix, mailing_address_source, mailing_address_international_address,
        mailing_address_addressLine1, mailing_address_addressLine2, mailing_address_city,
        mailing_address_state, mailing_address_county, mailing_address_zipcode,
        mailing_address_country, residential_address_source,
        residential_address_international_address, residential_address_addressLine1,
        residential_address_addressLine2, residential_address_city,
        residential_address_state, residential_address_county,
        residential_address_zipcode, residential_address_country,
        residential_address_homePhone, residential_address_businessPhone,
        residential_address_cellPhone, residential_address_email,
        nearest_relative_relationship, nearest_relative_firstName,
        nearest_relative_lastName, nearest_relative_phone, relative_address_source,
        relative_address_international_address, relative_address_addressLine1,
        relative_address_addressLine2, relative_address_city, relative_address_state,
        relative_address_county, relative_address_zipcode, relative_address_country,
        familyViolence, employer_info_employed, incom_info_type,
        incom_info_frequency, incom_info_amount, currentTcaRecipient,
        currentMaRecipient, formerTcaRecipient, formerMaRecipient, tcaApplicant,
        maApplicant, finacialStatemet, serviceFee, attorney_firstName,
        attorney_middleName, attorney_lastName, attorney_phone, attorney_source,
        attorney_interNationalAddress, attorney_addressLine1, attorney_addressLine2,
        attorney_city, attorney_state, attorney_county, attorney_zipcode,
        attorney_country]
    );
    const applicantId = result.rows[0].id;

    applicantData= req.body;
    // Check if income data exists and is an array
    if (applicantData.income && Array.isArray(applicantData.income)) {

      // Insert each income with the foreign key (applicant_id)
      for (const income of applicantData.income) {
        const incomeQuery = `INSERT INTO income (applicant_id, income_info_type, income_info_frequency, income_info_amount)
    VALUES ($1, $2, $3, $4)`;
        const incomeValues = [
          applicantId, income.incom_info_type, income.incom_info_frequency, income.incom_info_amount];
        await pool.query(incomeQuery, incomeValues);

      }
    }

    // Check if asset data exists and is an array
    if (applicantData.asset && Array.isArray(applicantData.asset)) {

      // Insert each asset with the foreign key (applicant_id)
      for (const asset of applicantData.asset) {
        const assetQuery = `INSERT INTO asset (applicant_id, asset_type, asset_value)
    VALUES ($1, $2, $3)`;
        const assetValues = [
          applicantId, asset.asset_type, asset.asset_value];
        await pool.query(assetQuery, assetValues);

      }
    }

    pool.query('COMMIT');


    res.status(200).json({ message: 'Form submitted successfully!', id: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting form data', error);
    res.status(500).json({ message: 'Error submitting form' })
    pool.query('ROLLBACK');
  }
});


app.post('/ncp-form-submit', async (req, res) => {
  const formData = req.body;

const mappedData = {
  first_name: formData.firstName,
    middle_name: formData.maidenName,
    last_name: formData.lastName,
    suffix: formData.suffix,
    relationship_to_child: formData.relationshipToChild,
    nick_name: formData.nickName,
    maiden_name: formData.maidenName,
    approx_age: formData.approx_age,
    source: formData.source,
    international_address: formData.international_address,
    address_line1: formData.address_line1,
    address_line2: formData.address_line2,
    city: formData.city,
    state: formData.state,
    county: formData.county,
    zipcode: formData.zipcode,
    country: formData.country,
    citizenship_status: formData.citizenship_status,
    marital_status: formData.marital_status,
    email: formData.email,
    home_phone: formData.home_phone,
    business_phone: formData.business_phone,
    cell_phone: formData.cell_phone,
    race: formData.race,
    gender: formData.gender,
    ssn_itin: formData.ssnItin,
    dob: formData.dob,
    eye_color: formData.eye_color,
    height_ft: formData.height_ft,
    height_in: formData.height_in,
    identification_mark: formData.identification_mark,
    hair_color: formData.hair_colour,
    weight: formData.weight,
    drivers_license_number: formData.drivers_license_number,
    place_of_birth_city: formData.place_of_birth_city,
    place_of_birth_state: formData.place_of_birth_state,
    member_of_union_or_local: formData.member_of_union_or_local,
    ncp_alternative_first_name: formData.ncpAlternativeFirstName,
    ncp_alternative_middle_name: formData.ncpAlternativeMiddleName,
    ncp_alternative_last_name: formData.ncpAlternativeLastName,
    ncp_alternative_suffix: formData.ncpAlternativeSuffix,
    served_in_military: formData.served_in_military,
    been_in_jail: formData.been_in_jail,
    nearest_relative_first_name: formData.nearest_relative_firstName,
    nearest_relative_middle_name: formData.nearest_relative_middleName,
    nearest_relative_last_name: formData.nearest_relative_lastName,
    nearest_relative_relationship: formData.nearest_relative_relationship,
    nearest_relative_phone: formData.nearest_relative_phone,
    relative_address_source: formData.relative_address_source,
    relative_address_international_address: formData.relative_address_international_address,
    relative_address_address_line1: formData.relative_address_addressLine1,
    relative_address_address_line2: formData.relative_address_addressLine2,
    relative_address_city: formData.relative_address_city,
    relative_address_state: formData.relative_address_state,
    relative_address_county: formData.relative_address_county,
    relative_address_zipcode: formData.relative_address_zipcode,
    relative_address_country: formData.relative_address_country,
    ncp_mother_first_name: formData.ncp_mother_firstName,
    ncp_mother_middle_name: formData.ncp_mother_middleName,
    ncp_mother_last_name: formData.ncp_mother_lastName,
    ncp_mother_phone: formData.ncp_mother_phone,
    ncp_mother_source: formData.ncp_mother_source,
    ncp_mother_international_address: formData.ncp_mother_interNationalAddress,
    ncp_mother_address_line1: formData.ncp_mother_address_line1,
    ncp_mother_address_line2: formData.ncp_mother_address_line2,
    ncp_mother_city: formData.ncp_mother_city,
    ncp_mother_state: formData.ncp_mother_state,
    ncp_mother_county: formData.ncp_mother_county,
    ncp_mother_zipcode: formData.ncp_mother_zipcode,
    ncp_mother_country: formData.ncp_mother_country,
    ncp_father_first_name: formData.ncp_father_firstName,
    ncp_father_middle_name: formData.ncp_father_middleName,
    ncp_father_last_name: formData.ncp_father_lastName,
    ncp_father_phone: formData.ncp_father_phone,
    ncp_father_source: formData.ncp_father_source,
    ncp_father_international_address: formData.ncp_father_interNationalAddress,
    ncp_father_address_line1: formData.ncp_father_address_line1,
    ncp_father_address_line2: formData.ncp_father_address_line2,
    ncp_father_city: formData.ncp_father_city,
    ncp_father_state: formData.ncp_father_state,
    ncp_father_county: formData.ncp_fathers_county,
    ncp_father_zipcode: formData.ncp_father_zipcode,
    ncp_father_country: formData.ncp_father_country,
    employer_info_employed: formData.employer_info_employed,
    permit_to_work: formData.permit_to_work,
    type_info: formData.type_info,
    other_child_cases: formData.other_child_cases,
    income_state: formData.income_state,
    income_type: formData.income_type,
    income_frequency: formData.income_frequency,
    income_amount: formData.income_amount,
    ncp_attorney_first_name: formData.ncp_attorney_firstName,
    ncp_attorney_middle_name: formData.ncp_attorney_middleName,
    ncp_attorney_last_name: formData.ncp_attorney_lastName,
    ncp_attorney_phone: formData.ncp_attorney_phone,
    ncp_attorney_source: formData.ncp_attorney_source,
    ncp_attorney_international_address: formData.ncp_attorney_interNationalAddress,
    ncp_attorney_address_line1: formData.ncp_attorney_addressLine1,
    ncp_attorney_address_line2: formData.ncp_attorney_addressLine2,
    ncp_attorney_city: formData.ncp_attorney_city,
    ncp_attorney_state: formData.ncp_attorney_state,
    ncp_attorney_county: formData.ncp_attorney_county,
    ncp_attorney_zipcode: formData.ncp_attorney_zipcode,
    ncp_attorney_country: formData.ncp_attorney_country
}

    // Only extract and insert the keys that match the DB columns
// const columns = ['first_name',
//   'middle_name',
//   'last_name',
//   'suffix',
//   'relationship_to_child',
//   'nick_name',
//   'maiden_name',
//   'approx_age',
//   'source',
//   'international_address',
//   'address_line1',
//   'address_line2',
//   'city',
//   'state',
//   'county',
//   'zipcode',
//   'country',
//   'citizenship_status',
//   'marital_status',
//   'email',
//   'home_phone',
//   'business_phone',
//   'cell_phone',
//   'race',
//   'gender',
//   'ssn_itin',
//   'dob',
//   'eye_color',
//   'height_ft',
//   'height_in',
//   'identification_mark',
//   'hair_color',
//   'weight',
//   'drivers_license_number',
//   'place_of_birth_city',
//   'place_of_birth_state',
//   'member_of_union_or_local',
//   'ncp_alternative_first_name',
//   'ncp_alternative_middle_name',
//   'ncp_alternative_last_name',
//   'ncp_alternative_suffix',
//   'served_in_military',
//   'been_in_jail',
//   'nearest_relative_first_name',
//   'nearest_relative_middle_name',
//   'nearest_relative_last_name',
//   'nearest_relative_relationship',
//   'nearest_relative_phone',
//   'relative_address_source',
//   'relative_address_international_address',
//   'relative_address_address_line1',
//   'relative_address_address_line2',
//   'relative_address_city',
//   'relative_address_state',
//   'relative_address_county',
//   'relative_address_zipcode',
//   'relative_address_country',
//   'ncp_mother_first_name',
//   'ncp_mother_middle_name',
//   'ncp_mother_last_name',
//   'ncp_mother_phone',
//   'ncp_mother_source',
//   'ncp_mother_international_address',
//   'ncp_mother_address_line1',
//   'ncp_mother_address_line2',
//   'ncp_mother_city',
//   'ncp_mother_state',
//   'ncp_mother_county',
//   'ncp_mother_zipcode',
//   'ncp_mother_country',
//   'ncp_father_first_name',
//   'ncp_father_middle_name',
//   'ncp_father_last_name',
//   'ncp_father_phone',
//   'ncp_father_source',
//   'ncp_father_international_address',
//   'ncp_father_address_line1',
//   'ncp_father_address_line2',
//   'ncp_father_city',
//   'ncp_father_state',
//   'ncp_father_county',
//   'ncp_father_zipcode',
//   'ncp_father_country',
//   'employer_info_employed',
//   'permit_to_work',
//   'type_info',
//   'other_child_cases',
//   'income_state',
//   'income_type',
//   'income_frequency',
//   'income_amount',
//   'ncp_attorney_first_name',
//   'ncp_attorney_middle_name',
//   'ncp_attorney_last_name',
//   'ncp_attorney_phone',
//   'ncp_attorney_source',
//   'ncp_attorney_international_address',
//   'ncp_attorney_address_line1',
//   'ncp_attorney_address_line2',
//   'ncp_attorney_city',
//   'ncp_attorney_state',
//   'ncp_attorney_county',
//   'ncp_attorney_zipcode',
//   'ncp_attorney_country'];
    // Only extract matching keys from formData
  // const keys = columns.filter(column => formData.hasOwnProperty(column));
  // const values = keys.map(key => formData[key]);
  // const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

  // Generate placeholders dynamically
  //const keys = Object.keys(formData);
  //const values = Object.values(formData);
  //const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
  try {
    await pool.query('BEGIN');

    const keys = Object.keys(mappedData);
    const values = Object.values(mappedData);
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');

    // const result = await pool.query(
    //   `INSERT INTO ncp_form_data (first_name,
    // middle_name,
    // last_name,
    // suffix,
    // relationship_to_child,
    // nick_name,
    // maiden_name,
    // approx_age,
    // source,
    // international_address,
    // address_line1,
    // address_line2,
    // city,
    // state,
    // county,
    // zipcode,
    // country,
    // citizenship_status,
    // marital_status,
    // email,
    // home_phone,
    // business_phone,
    // cell_phone,
    // race,
    // gender,
    // ssn_itin,
    // dob,
    // eye_color,
    // height_ft,
    // height_in,
    // identification_mark,
    // hair_color,
    // weight,
    // drivers_license_number,
    // place_of_birth_city,
    // place_of_birth_state,
    // member_of_union_or_local,
    // ncp_alternative_first_name,
    // ncp_alternative_middle_name,
    // ncp_alternative_last_name,
    // ncp_alternative_suffix,
    // served_in_military,
    // been_in_jail,
    // nearest_relative_first_name,
    // nearest_relative_middle_name,
    // nearest_relative_last_name,
    // nearest_relative_relationship,
    // nearest_relative_phone,
    // relative_address_source,
    // relative_address_international_address,
    // relative_address_address_line1,
    // relative_address_address_line2,
    // relative_address_city,
    // relative_address_state,
    // relative_address_county,
    // relative_address_zipcode,
    // relative_address_country,
    // ncp_mother_first_name,
    // ncp_mother_middle_name,
    // ncp_mother_last_name,
    // ncp_mother_phone,
    // ncp_mother_source,
    // ncp_mother_international_address,
    // ncp_mother_address_line1,
    // ncp_mother_address_line2,
    // ncp_mother_city,
    // ncp_mother_state,
    // ncp_mother_county,
    // ncp_mother_zipcode,
    // ncp_mother_country,
    // ncp_father_first_name,
    // ncp_father_middle_name,
    // ncp_father_last_name,
    // ncp_father_phone,
    // ncp_father_source,
    // ncp_father_international_address,
    // ncp_father_address_line1,
    // ncp_father_address_line2,
    // ncp_father_city,
    // ncp_father_state,
    // ncp_father_county,
    // ncp_father_zipcode,
    // ncp_father_country,
    // employer_info_employed,
    // permit_to_work,
    // type_info,
    // other_child_cases,
    // income_state,
    // income_type,
    // income_frequency,
    // income_amount,
    // ncp_attorney_first_name,
    // ncp_attorney_middle_name,
    // ncp_attorney_last_name,
    // ncp_attorney_phone,
    // ncp_attorney_source,
    // ncp_attorney_international_address,
    // ncp_attorney_address_line1,
    // ncp_attorney_address_line2,
    // ncp_attorney_city,
    // ncp_attorney_state,
    // ncp_attorney_county,
    // ncp_attorney_zipcode,
    // ncp_attorney_country) VALUES (${placeholders}) RETURNING id;`, values
    // );
    const result = await pool.query(
      `INSERT INTO ncp_form_data (${keys.join(', ')}) VALUES (${placeholders}) RETURNING id;`,
      values
    );

    const ncpId = result.rows[0].id;

    ncpData = req.body;
    // Check if income data exists and is an array
    if (ncpData.ncp_income && Array.isArray(ncpData.ncp_income)) {

      // Insert each income with the foreign key (applicant_id)
      for (const income of ncpData.ncp_income) {
        const incomeQuery = `INSERT INTO ncp_income (ncp_id, income_type, income_frequency, income_amount)
    VALUES ($1, $2, $3, $4)`;
        const incomeValues = [
          ncpId, income.income_type, income.income_frequency, income.income_amount];
        await pool.query(incomeQuery, incomeValues);

      }
    }

    // Check if asset data exists and is an array
    if (ncpData.ncp_asset && Array.isArray(ncpData.ncp_asset)) {

      // Insert each asset with the foreign key (applicant_id)
      for (const asset of ncpData.ncp_asset) {
        const assetQuery = `INSERT INTO ncp_asset (ncp_id, asset_type, asset_value)
    VALUES ($1, $2, $3)`;
        const assetValues = [
          ncpId, asset.asset_type, asset.asset_value];
        await pool.query(assetQuery, assetValues);

      }
    }

    pool.query('COMMIT');
    res.status(200).json({ message: 'Form Submitted successfully', id: result.rows[0].id });
    
    

  } catch (error) {
    console.error('Error inserting form data', error);
    res.status(500).json({ message: 'Error submitting form' });
    pool.query('ROLLBACK');

  }
});


app.post('/parent-child', async (req, res) => {
  const parentData = req.body;
  try {
    await pool.query('BEGIN');
    const parentQuery = ` INSERT INTO parents_relation (relationship, date_married, date_separated, country_separated, state_separated, county_separated, divorce_pending, child_support_included)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    const parentValues = [parentData.relationship, parentData.date_married, parentData.date_separated,
    parentData.country_separated, parentData.state_separated, parentData.county_separated,
    parentData.divorce_pending, parentData.child_support_included];
    const parentResult = await pool.query(parentQuery, parentValues);
    const parentId = parentResult.rows[0].id;


    // Check if children data exists and is an array
    if (parentData.children && Array.isArray(parentData.children)) {

      // Insert each child with the foreign key (parent_id)
      for (const child of parentData.children) {
        const childQuery = `INSERT INTO children (parent_id, first_name, middle_name, last_name, suffix, race, relationship_to_applicant, conception_occurred_state, gender, state, county, city, ssn, dob, mother_married_father, order_for_child_support, ncp_pay_support, ncp_pay)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`;
        const childValues = [
          parentId, child.firstName, child.middleName, child.lastName, child.suffix, child.race, child.relationshipToApplicant,
          child.conceptionOccurredState, child.gender, child.state, child.county, child.city, child.ssn, child.dob,
          child.mother_married_father, child.order_for_childSupport, child.ncp_pay_support, child.ncp_pay

        ];
        await pool.query(childQuery, childValues);

      }
    }
    res.status(200).send({ message: 'Parent and children data saved successfully.' });
    pool.query('COMMIT');

  } catch (error) {
    console.error('Error saving parent and children data:', error);
    res.status(500).send({ message: 'Error saving parent and children data.' });
    pool.query('ROLLBACK');

  }
});

// Set up multer for file upload
const storagemulter = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending file extension
  },
});


// Configure multer for file uploads
// const storage = multer.memoryStorage();

const upload = multer({ storage: storagemulter });
// Endpoint to handle insurance data and file uploads
app.post('/insurance-submit', upload.array('documents', 10), async (req, res) => {

  console.log("request body", req.body); // For JSON data
  console.log(req.file); //

  // const { policyNumber, agentName } = req.body;
  // const documentFile = req.files; // Get the uploaded file

  //const insurance = req.body.insurance;
  try {
    const insurance = req.body.insurance; // Parse the insurance data array
    const documents = req.files; // Array of uploaded files

    console.log("Insurance data received:", insurance);
    console.log("Uploaded files:", documents);

    console.log("File", req.file); // Check if file is present

    // Start a transaction
    await pool.query('BEGIN');

    if (!documents) {
      return res.status(400).json({ message: 'No document uploaded' });
    }
    // Array to hold the results from the database
    const insertResults = [];

    for (let index = 0; index < insurance.length; index++) {
      const data = insurance[index];
      const { policyNumber, agentName } = data;
      const documentFile = documents[index]; // Get the corresponding file for this entry
      console.log('Inserting policyNumber:', policyNumber);
      console.log('Inserting agentName:', agentName);
      console.log('Document file:', documentFile ? documentFile.originalname : 'No file uploaded');
      const result = await pool.query(
        `INSERT INTO insurance  (policy_number, agent_name, document) VALUES ($1, $2, $3) RETURNING id;`,
        [policyNumber, agentName, documentFile.path]
      );
      // return result;
      console.log('Inserted ID:', result.rows[0].id);
      // Collect the returned ID
      insertResults.push(result.rows[0].id);

    }
    // Commit the transaction after all inserts are successful
    await pool.query('COMMIT');
    // Send back the inserted row IDs
    res.status(200).json({ message: 'Insurance data submitted successfully', ids: insertResults });

    // const promises = insurance.map(async (data, index)=>{
    //   const { policyNumber, agentName } = data;
    //   const documentPath = req.files[index] ? req.files[index].path : null; // Get the file path

    //       // Insert each insurance item into the database
    //   return await pool.query(
    //     `INSERT INTO insurance  (policy_number, agent_name, document) VALUES ($1, $2, $3) RETURNING id;`, 
    //     [policyNumber, agentName, documentPath]
    //   ).then(result => {
    //     insertResults.push(result.rows[0].id); // Collect the returned ID
    //   });      
    // // return result;
    // });
    //     // Wait for all insert operations to finish
    // await Promise.all(promises);


    // pool.query('COMMIT');
    // res.status(200).json({message: 'Form Submitted successfully', ids: insertResults });



  } catch (error) {
    console.error('Error inserting form data', error);
    res.status(500).json({ message: 'Error saving insurance data' });
    pool.query('ROLLBACK');

  }
});





//const uploadfile = multer({ storage: storagemulter });

app.post('/service-request', upload.single('fileInput'), async (req, res) => {
  console.log("request body", req.body); // For JSON data
  console.log(req.file); //

  const {
    fullServices,
    locateOnly,
    paternityOnly,
    medicalSupportOnly,
    childSupportOnly,
    childAndSpousalSupportOnly,
    category,
    document_type,
  } = req.body;

  const filePath = req.file ? req.file.path : null;

  try {
    console.log("File", req.file); // Check if file is present
    await pool.query('BEGIN');
    // if (!documentFile) {
    //   return res.status(400).json({ message: 'No document uploaded' });
    // }
    const result = await pool.query(
      `INSERT INTO service_requests 
        (full_services, locate_only, paternity_only, medical_support_only, child_support_only, child_and_spousal_support_only, category, document_type, file_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        fullServices,
        locateOnly,
        paternityOnly,
        medicalSupportOnly,
        childSupportOnly,
        childAndSpousalSupportOnly,
        category,
        document_type,
        filePath
      ]
    );
    pool.query('COMMIT');

    res.status(200).json({ message: 'Form Submitted successfully', id: result.rows[0].id });

  } catch (error) {
    console.error('Error inserting form data', error);
    res.status(500).json({ message: 'Error saving insurance data' });
    pool.query('ROLLBACK');

  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
