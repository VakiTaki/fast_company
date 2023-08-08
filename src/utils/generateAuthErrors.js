export function generateAuthErrors(error) {
   const { code, message } = error;
   if (code === 400) {
      switch (message) {
         case "EMAIL_NOT_FOUND": return "Неверные данные для входа";
         case "INVALID_PASSWORD": return "Неверные данные для входа";
         case "EMAIL_EXISTS": return "Пользователь с такой почтой уже сущетвует";
         default: return "Cлишком много попыток входа, попробуйте позднее";
      }
   };
};
