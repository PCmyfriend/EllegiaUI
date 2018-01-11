import {
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
} from './constants';

export function loadCustomers() {
  return {
    type: LOAD_CUSTOMERS,
  };
}

export function loadCustomersSuccess(customers) {
  return {
    type: LOAD_CUSTOMERS_SUCCESS,
    customers,
  };
}

export function addCustomer(customer) {
  return {
    type: ADD_CUSTOMER,
    customer,
  };
}

export function addCustomerSuccess(customer) {
  return {
    type: ADD_CUSTOMER_SUCCESS,
    customer,
  };
}

export function deleteCustomer(customerId) {
  return {
    type: DELETE_CUSTOMER,
    customerId,
  }
}

export function deleteCustomerSuccess(customerId) {
  return {
    type: DELETE_CUSTOMER_SUCCESS,
    customerId,
  }
}

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact,
  };
}

export function addContactSuccess(contact) {
  return {
    type: ADD_CONTACT_SUCCESS,
    contact,
  };
}

export function deleteContact(contactId) {
  return {
    type: DELETE_CONTACT,
    contactId
  }
}

export function deleteContactSuccess(contact) {
  return {
    type: DELETE_CONTACT_SUCCESS,
    contact
  }
}
