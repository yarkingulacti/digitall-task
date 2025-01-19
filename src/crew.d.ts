export interface CrewMember {
  id: string;
  first_name: string;
  last_name: string;
  slug: string;
  nationality: string;
  title: CrewMemberTitle;
  days_on_board: number;
  daily_rate: number;
  currency: 'USD' | 'EUR' | 'GBP';
  total_income: number;
  certificates: CrewMemberCertificate[];
}

export interface CrewMemberTitle {
  id: string;
  name: string;
  description: string;
}

export interface CrewMemberCertificate {
  id: string;
  title: string;
  description: string;
  type: CertificateType;
  issue_date: Date;
  expiration_date?: Date;
}

export interface CertificateType {
  id: string;
  title: string;
  description: string;
}
