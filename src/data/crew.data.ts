// This file was generated by AI(Claude 3.5 Sonnet model)

import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { Crew } from './types';
import titles from './titles.data';
import certificates from './certificates.data';

// Helper function to get random items from an array
const getRandomItems = <T>(arr: T[], min: number = 1, max: number = 3): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const crews: Crew[] = [
  {
    id: uuidv4(),
    first_name: 'John',
    last_name: 'Smith',
    slug: slugify('John Smith', { lower: true }),
    nationality: 'American',
    title: titles[0], // Captain
    days_on_board: 180,
    daily_rate: 450,
    currency: 'USD',
    total_income: 81000,
    certificates: getRandomItems(certificates, 2, 4),
  },
  {
    id: uuidv4(),
    first_name: 'Maria',
    last_name: 'Garcia',
    slug: slugify('Maria Garcia', { lower: true }),
    nationality: 'Spanish',
    title: titles[1], // Chief Officer
    days_on_board: 150,
    daily_rate: 350,
    currency: 'EUR',
    total_income: 52500,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Yuki',
    last_name: 'Tanaka',
    slug: slugify('Yuki Tanaka', { lower: true }),
    nationality: 'Japanese',
    title: titles[2], // Second Officer
    days_on_board: 120,
    daily_rate: 300,
    currency: 'USD',
    total_income: 36000,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Andreas',
    last_name: 'Mueller',
    slug: slugify('Andreas Mueller', { lower: true }),
    nationality: 'German',
    title: titles[3], // Chief Engineer
    days_on_board: 160,
    daily_rate: 400,
    currency: 'EUR',
    total_income: 64000,
    certificates: getRandomItems(certificates, 2, 4),
  },
  {
    id: uuidv4(),
    first_name: 'Elena',
    last_name: 'Popov',
    slug: slugify('Elena Popov', { lower: true }),
    nationality: 'Russian',
    title: titles[4], // Second Engineer
    days_on_board: 140,
    daily_rate: 320,
    currency: 'USD',
    total_income: 44800,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'James',
    last_name: 'Wilson',
    slug: slugify('James Wilson', { lower: true }),
    nationality: 'British',
    title: titles[5], // Third Engineer
    days_on_board: 130,
    daily_rate: 280,
    currency: 'GBP',
    total_income: 36400,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Sophie',
    last_name: 'Laurent',
    slug: slugify('Sophie Laurent', { lower: true }),
    nationality: 'French',
    title: titles[6], // Deck Cadet
    days_on_board: 90,
    daily_rate: 150,
    currency: 'EUR',
    total_income: 13500,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Marco',
    last_name: 'Rossi',
    slug: slugify('Marco Rossi', { lower: true }),
    nationality: 'Italian',
    title: titles[7], // Chief Cook
    days_on_board: 170,
    daily_rate: 250,
    currency: 'EUR',
    total_income: 42500,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Lars',
    last_name: 'Nielsen',
    slug: slugify('Lars Nielsen', { lower: true }),
    nationality: 'Danish',
    title: titles[8], // Bosun
    days_on_board: 145,
    daily_rate: 220,
    currency: 'EUR',
    total_income: 31900,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Anna',
    last_name: 'Kowalski',
    slug: slugify('Anna Kowalski', { lower: true }),
    nationality: 'Polish',
    title: titles[9], // Able Seaman
    days_on_board: 135,
    daily_rate: 180,
    currency: 'USD',
    total_income: 24300,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Dimitri',
    last_name: 'Ivanov',
    slug: slugify('Dimitri Ivanov', { lower: true }),
    nationality: 'Russian',
    title: titles[10], // Electrician
    days_on_board: 155,
    daily_rate: 290,
    currency: 'USD',
    total_income: 44950,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Carlos',
    last_name: 'Santos',
    slug: slugify('Carlos Santos', { lower: true }),
    nationality: 'Brazilian',
    title: titles[11], // Oiler
    days_on_board: 125,
    daily_rate: 170,
    currency: 'USD',
    total_income: 21250,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Eva',
    last_name: 'Andersson',
    slug: slugify('Eva Andersson', { lower: true }),
    nationality: 'Swedish',
    title: titles[12], // Third Officer
    days_on_board: 110,
    daily_rate: 270,
    currency: 'EUR',
    total_income: 29700,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Ali',
    last_name: 'Hassan',
    slug: slugify('Ali Hassan', { lower: true }),
    nationality: 'Egyptian',
    title: titles[13], // Fourth Engineer
    days_on_board: 140,
    daily_rate: 260,
    currency: 'USD',
    total_income: 36400,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Peter',
    last_name: 'van der Berg',
    slug: slugify('Peter van der Berg', { lower: true }),
    nationality: 'Dutch',
    title: titles[14], // Radio Officer
    days_on_board: 165,
    daily_rate: 310,
    currency: 'EUR',
    total_income: 51150,
    certificates: getRandomItems(certificates, 1, 3),
  },
  {
    id: uuidv4(),
    first_name: 'Liam',
    last_name: "O'Connor",
    slug: slugify("Liam O'Connor", { lower: true }),
    nationality: 'Irish',
    title: titles[15], // Steward
    days_on_board: 130,
    daily_rate: 190,
    currency: 'EUR',
    total_income: 24700,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Nina',
    last_name: 'Petrova',
    slug: slugify('Nina Petrova', { lower: true }),
    nationality: 'Bulgarian',
    title: titles[16], // Deck Fitter
    days_on_board: 150,
    daily_rate: 200,
    currency: 'USD',
    total_income: 30000,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Hans',
    last_name: 'Schmidt',
    slug: slugify('Hans Schmidt', { lower: true }),
    nationality: 'Austrian',
    title: titles[17], // Pumpman
    days_on_board: 145,
    daily_rate: 230,
    currency: 'EUR',
    total_income: 33350,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Miguel',
    last_name: 'Rodriguez',
    slug: slugify('Miguel Rodriguez', { lower: true }),
    nationality: 'Mexican',
    title: titles[18], // Motorman
    days_on_board: 160,
    daily_rate: 185,
    currency: 'USD',
    total_income: 29600,
    certificates: getRandomItems(certificates, 1, 2),
  },
  {
    id: uuidv4(),
    first_name: 'Alexis',
    last_name: 'Papadopoulos',
    slug: slugify('Alexis Papadopoulos', { lower: true }),
    nationality: 'Greek',
    title: titles[19], // Wiper
    days_on_board: 120,
    daily_rate: 160,
    currency: 'EUR',
    total_income: 19200,
    certificates: getRandomItems(certificates, 1, 2),
  },
];

export default crews;
