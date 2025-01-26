/* eslint-disable */
// @ts-nocheck

import * as jspb from 'google-protobuf';

export class SearchRequest extends jspb.Message {
  constructor() {
    super();
    this.query_ = '';
    this.page_ = 0;
    this.page_size_ = 0;
  }

  getQuery() {
    return this.query_;
  }

  setQuery(value) {
    this.query_ = value;
  }

  getPage() {
    return this.page_;
  }

  setPage(value) {
    this.page_ = value;
  }

  getPageSize() {
    return this.page_size_;
  }

  setPageSize(value) {
    this.page_size_ = value;
  }

  serializeBinary() {
    return new Uint8Array();
  }

  static deserializeBinary(bytes) {
    return new SearchRequest();
  }
}

export class SearchResponse extends jspb.Message {
  constructor() {
    super();
    this.results_ = [];
  }

  getResults() {
    return this.results_;
  }

  setResults(value) {
    this.results_ = value;
  }

  serializeBinary() {
    return new Uint8Array();
  }

  static deserializeBinary(bytes) {
    return new SearchResponse();
  }
}
