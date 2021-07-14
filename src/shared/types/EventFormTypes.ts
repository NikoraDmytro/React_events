export type FormValues = {
  eventName: string;
  eventDate: string;
  eventStart: string;
  eventEnd: string;
};

export type FormErrors = {
  eventName?: string;
  eventDate?: string;
  eventStart?: string;
  eventEnd?: string;
};

export type FormInputProps = {
  name: string;
  label: string;
  [props: string]: any;
};
