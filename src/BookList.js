import React, { Component } from "react";
import { observer } from "mobx-react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import bookStore from "./stores/bookStore";

class BookList extends Component {
  render() {
    bookStore.bookColor = this.props.match.params.bookColor;
    let books = bookStore.filteredBooks;

    if (bookStore.bookColor) {
      books = bookStore.filterBooksByColor;
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
