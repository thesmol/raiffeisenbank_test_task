export interface IAddress {
    street: string;
    city: string;
    suite: string;
    zipcode: string;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    company: ICompany;
    phone: string;

    [key: string]: string | number | IAddress | ICompany;
}

export interface IFilterState {
    sort: string;
    query: string;
}
