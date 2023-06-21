const optionsYears = {
   year: "numeric",
   month: "long",
   day: "numeric"
};
const optionsYear = {
   month: "long",
   day: "numeric"
};
export const dataFormat = (data) => {
   const dataNow = new Date(Date.now());
   const msgDate = new Date(+data);
   if (dataNow - msgDate < 60 * 1000) return "1 минуту назад";
   if (dataNow - msgDate < 5 * 60 * 1000) return "5 минут назад";
   if (dataNow - msgDate < 10 * 60 * 1000) return "10 минут назад";
   if (dataNow - msgDate < 30 * 60 * 1000) return "30 минут назад";
   if (dataNow - msgDate < 24 * 60 * 60 * 1000) return msgDate.getHours() + ":" + (msgDate.getMinutes().toString().length > 1 ? msgDate.getMinutes() : "0" + msgDate.getMinutes());
   if (dataNow.getFullYear() - msgDate.getFullYear() === 0) return msgDate.toLocaleDateString("ru", optionsYear);
   return msgDate.toLocaleDateString("ru", optionsYears);
};
