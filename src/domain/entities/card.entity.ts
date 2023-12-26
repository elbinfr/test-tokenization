export class CardEntity {
  card_number: number;
  cvv: number;
  expiration_month: string;
	expiration_year: string;
	email: string;

  set setCardNumber (card_number: string) {
    if (!card_number) {
      throw new Error("es necesario ingresar número de tarjeta");
    } else {
      if (isNaN(parseInt(card_number))) {
        throw new Error("número de tarjeta debe ser solo números");
      } else {
        if (card_number.length < 13 || card_number.length > 16) {
          throw new Error("número de tarjeta debe tener entre 13 a 16 dígitos");
        }
        let digits = card_number.split('');
        let index = 1;
        let sumOfDigits = 0;
        for (let i = digits.length - 1; i >= 0; i--) {
          let digit = parseInt(digits[i]);
          if (index % 2 === 0) {
            digit = digit * 2;
            if (digit > 9) {
              digit = ((digit - 1) % 9) + 1;
            }
          }
          sumOfDigits += digit;
          index++;
        }
        if (!(sumOfDigits % 10 === 0)) {
          throw new Error("número de tarjeta es incorrecto");
        }
      }
    }
    this.card_number = parseInt(card_number);
  }

  set setCvv (cvv: string) {
    if (!cvv) {
      throw new Error("es necesario ingresar cvv");
    } else {
      if (isNaN(parseInt(cvv))) {
        throw new Error("cvv debe ser solo números");
      }
      if (cvv.length < 3 || cvv.length > 4) {
        throw new Error("cvv debe tener entre 3 a 4 dígitos");
      }
    }
    this.cvv = parseInt(cvv);
  }

  set setExpirationMonth (expiration_month: string) {
    if (!expiration_month) {
      throw new Error("es necesario ingresar mes de vencimiento");
    } else {
      if (isNaN(parseInt(expiration_month))) {
        throw new Error("mes de vencimiento debe ser solo números");
      } else if (parseInt(expiration_month) < 0 || parseInt(expiration_month) > 13) {
        throw new Error("mes de vencimiento debe estar comprendido entre 1 y 12");
      }
    }

    this.expiration_month = expiration_month;
  }

  set setExpirationYear (expiration_year: string) {
    if (!expiration_year) {
      throw new Error("es necesario ingresar año de vencimiento");
    } else {
      if (isNaN(parseInt(expiration_year))) {
        throw new Error("año de vencimiento debe ser solo números");
      } else {
        let current = new Date();
        let currentYear = current.getFullYear();
        if (parseInt(expiration_year) < currentYear || parseInt(expiration_year) > (currentYear + 5)) {
          throw new Error(`año de vencimiento debe estar comprendido entre ${currentYear} y ${currentYear + 5}`);
        }
      }
    }

    this.expiration_year = expiration_year;
  }

  set setEmail (email: string) {
    let validDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
    if (!email) {
      throw new Error("es necesario ingresar el correo");
    } else {
      let patternEmail = new RegExp(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      );
      if (!patternEmail.test(email)) {
        throw new Error("el correo ingresado no tiene el formato correcto");
      }

      let sections = email.split("@");
      let domain = sections[1];
      if (!validDomains.includes(domain)) {
        throw new Error("solo se permiten correos de gmail, hotmail o yahoo");
      }

    }
    this.email = email;
  }
}
