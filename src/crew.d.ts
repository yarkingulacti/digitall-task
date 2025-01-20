export interface Crew {
  id: string;
  first_name: string;
  last_name: string;
  slug: string;
  nationality: string;
  title: CrewTitle;
  days_on_board: number;
  daily_rate: number;
  currency: 'USD' | 'EUR' | 'GBP';
  total_income: number;
  certificates: Certificate[];
}

export interface CrewTitle {
  id: string;
  name: string;
  description: string;
}

export interface CertificateType {
  id: string;
  title: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  type: CertificateType;
  issue_date: Date;
  expiration_date?: Date;
}
