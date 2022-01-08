import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactList/ContactList';
import { AppWrapper, Title } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  renderContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = idContact => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== idContact),
    }));
  };
  render() {
    const { addContact, handleChangeFilter, renderContacts } = this;
    return (
      <AppWrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
        <Title>Contacts</Title>
        <Filter onChange={handleChangeFilter} />
        <ContactsList
          contacts={renderContacts()}
          onDeleteContact={this.deleteContact}
        />
      </AppWrapper>
    );
  }
}
export default App;
