// This file was generated by AI(Claude 3.5 Sonnet model)

import { Certificate } from './types';
import { v4 as uuidv4 } from 'uuid';
import { certificateTypes } from './certificate-types.data';

const certificates: Certificate[] = [
  {
    id: uuidv4(),
    title: 'Master Mariner',
    description: 'Highest level deck officer qualification for merchant ships',
    issue_date: new Date('2022-01-15'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'GMDSS',
    description:
      'Global Maritime Distress and Safety System operator certificate',
    issue_date: new Date('2021-06-20'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Chief Mate',
    description: 'Senior deck officer qualification for merchant vessels',
    issue_date: new Date('2022-03-10'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'OOW',
    description: 'Officer of the Watch certification for navigation duties',
    issue_date: new Date('2023-01-05'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Chief Engineer License',
    description: 'Senior marine engineering qualification for large vessels',
    issue_date: new Date('2021-12-15'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Marine Engineering',
    description: "Professional qualification for ship's engineering operations",
    issue_date: new Date('2022-08-20'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Engineering Watch',
    description: 'Certification for engineering watchkeeping duties',
    issue_date: new Date('2023-02-15'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Cadet Training',
    description: 'Basic deck officer training certification for trainees',
    issue_date: new Date('2023-06-01'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: "Ship's Cook Certificate",
    description: 'Professional qualification for maritime culinary operations',
    issue_date: new Date('2022-04-10'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Able Seaman',
    description: 'Qualification for experienced deck crew operations',
    issue_date: new Date('2021-09-30'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'STCW Basic Safety',
    description: 'Mandatory basic safety training for seafarers',
    issue_date: new Date('2022-11-20'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Marine Electrician',
    description: "Specialized certification for ship's electrical systems",
    issue_date: new Date('2022-07-15'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Engine Room Rating',
    description: 'Basic qualification for engine room operations',
    issue_date: new Date('2023-03-25'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Food Safety',
    description: 'Maritime food handling and safety certification',
    issue_date: new Date('2023-04-10'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Welding Certificate',
    description: 'Professional marine welding and fitting qualification',
    issue_date: new Date('2022-09-15'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Tanker Operations',
    description:
      'Specialized certification for oil and chemical tanker operations',
    issue_date: new Date('2022-06-30'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Engine Room Safety',
    description: 'Safety certification for engine room personnel',
    issue_date: new Date('2023-05-20'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
  {
    id: uuidv4(),
    title: 'Basic Engine Safety',
    description: 'Entry-level engine room safety and operations certification',
    issue_date: new Date('2023-07-01'),
    type: certificateTypes[Math.floor(Math.random() * certificateTypes.length)],
  },
];

export default certificates;
