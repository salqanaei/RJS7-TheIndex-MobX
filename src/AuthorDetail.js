import React, { Component } from "react";
import { decorate, observable, computed } from "mobx";
import { observer } from "mobx-react";

import BookTable from "./BookTable";
import Loading from "./Loading";
import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";

class AuthorDetail extends Component {
  componentDidMount() {
    const authorID = this.props.match.params.authorID;
    authorStore.getAuthor(authorID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      const authorID = this.props.match.params.authorID;
      authorStore.getAuthor(authorID);
    }
  }

  render() {
    if (authorStore.loadingAuthor) {
      return <Loading />;
    } else {
      const author = authorStore.author;
      const authorName = `${author.first_name} ${author.last_name}`;
      const books = author.books.map(book => bookStore.getBookById(book.id));
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={books} />
        </div>
      );
    }
  }
}

export default observer(AuthorDetail);
