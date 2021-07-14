import { FormErrors, FormValues } from "../../shared/types/EventFormTypes";
import { parseDate } from "./../functions/parseDate";

export const eventFormValidation = (values: FormValues) => {
  const errors: FormErrors = {};
  const now = new Date();
  const minDate = parseDate(now);
  const fiveYearsLater = new Date(now.setFullYear(now.getFullYear() + 5));
  const maxDate = parseDate(fiveYearsLater);

  if (!values.eventName) {
    errors.eventName = "Поле не заполнено";
  } else if (values.eventName.length > 20) {
    errors.eventName = "Должно быть менее 20 символов в длину";
  }

  if (!values.eventDate) {
    errors.eventDate = "Поле не заполнено";
  } else if (values.eventDate < minDate) {
    errors.eventDate = "Этот день уже прошёл";
  } else if (values.eventDate > maxDate) {
    errors.eventDate =
      "Нельзя запланировать мероприятие более чем на 5 лет вперёд.";
  }

  if (!values.eventStart) {
    errors.eventStart = "Поле не заполнено";
  } else if (values.eventStart < "09:00") {
    errors.eventStart = "Минимальное время начала мероприятия - 09:00";
  } else if (values.eventStart > "18:00") {
    errors.eventStart = "Максимальное время начала мероприятия - 18:00";
  }

  if (!values.eventEnd) {
    errors.eventEnd = "Поле не заполнено";
  } else if (values.eventEnd < values.eventStart) {
    errors.eventEnd = "Укажите время после начала мероприятия";
  } else if (values.eventEnd > "18:00") {
    errors.eventEnd = "Максимальное время окончания мероприятия - 18:00";
  }

  return errors;
};
