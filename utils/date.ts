import { DAYS_OF_WEEK } from "@/constants/common";

export const getDayFromEpoch = (epochTime: number): number => {
  const date = new Date(epochTime * 1000);
  return date.getDate();
};

export const getDayOfWeekFromEpoch = (epochTime: number): string => {
  const date = new Date(epochTime * 1000);
  return DAYS_OF_WEEK[date.getDay()];
};

export const calculateDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (epochTime: number): string => {
  const date = new Date(epochTime * 1000);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day}${calculateDaySuffix(day)} ${month} ${year}`;
};

export const formatTime = (epochTime: number): string => {
  const date = new Date(epochTime * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export const formatTo12Hour = (utcTime: number): string => {
  const date = new Date(utcTime * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12;

  return `${hour12}${period}`;
};
