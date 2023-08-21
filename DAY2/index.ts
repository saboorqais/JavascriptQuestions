import fetch, { Response } from "node-fetch";

interface UserDataObject {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressObject;
  phone: string;
  website: string;
  company: CompanyData;
}

type AddressObject = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocationObject;
};

type GeoLocationObject = {
  lat: string;
  lng: string;
};
type CompanyData = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type UserDataList = UserDataObject[] | void | PromiseLike<void> | unknown;
type PhoneList = string[];

type CallBack = (data: UserDataList) => PhoneList;

function getPhoneNumbers(data: UserDataList): PhoneList {
  let phoneNumbers: string[] = [];
  if (Array.isArray(data)) {
    for (let item of data) {
      phoneNumbers.push(item.phone);
    }
  } else {
    return [];
  }

  return phoneNumbers;
}

function getDataUsingCallbacks(url: string, callback: CallBack) {
  fetch(url)
    .then((response: Response) => response.json() as Promise<UserDataObject[]>)
    .then((data: UserDataList) => {
      callback(data); // Call the provided callback with the response data
    })
    .catch((err: Error | null | undefined) => console.log(err));
}

getDataUsingCallbacks(
  "https://jsonplaceholder.typicode.com/users",
  (data: UserDataList): PhoneList => {
    console.log(getPhoneNumbers(data));
    return getPhoneNumbers(data);
  }
);

function getDataUsingPromise(url: string): Promise<UserDataObject[]> {
  return fetch(url)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      return response.json() as Promise<UserDataObject[]>;
    })
    .catch((error: Error) => {
      throw new Error(`Error during fetching: ${error.message}`);
    });
}
getDataUsingPromise("https://jsonplaceholder.typicode.com/users").then(
  (data: UserDataList) => {
    console.log(getPhoneNumbers(data));
  }
);

async function getDataUsingAsync(url: string) {
  try {
    let response: Response = await fetch(url);
    const data: UserDataList = await response.json();
    console.log(getPhoneNumbers(data));
  } catch (error) {
    throw error;
  }
}

getDataUsingAsync("https://jsonplaceholder.typicode.com/users");
