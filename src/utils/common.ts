export const validateEmail = (email:string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

export const isUserLoggedIn = () => {
  let getToken = localStorage.getItem('token');
  if(getToken){
    return true;
  }
  return false;
};


export const isUserLoggedInData = () => {
  let getToken = localStorage.getItem('profile');
  if(getToken){
    return JSON.parse(getToken);
  }
  return "";
};