export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.isPhone) {
    const pattern = /^[7-9]\d{9}$/;
    isValid = pattern.test(value) && isValid;
  }

  if(rules.isEmail) {
    const pattern = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    isValid = pattern.test(value) && isValid;
  }

  if(rules.isPassword){
    const pattern = /^(?=.*\d).{4,16}$/;
    isValid = pattern.test(value) && isValid;
  }

  if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
  }

  if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
}
