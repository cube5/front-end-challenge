import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeConsumer } from "../../context/Theme";
import { BookConsumer } from "../../context/Book";
import ThemeToggler from "../ThemeToggler";
import DropDown from "../DropDown";

const styles = {
  container: css`
    display: flex;
    align-items: center;
    background: hotpink;
    padding: 10px;
    justify-content: space-between;
  `,
  logo: css`
    height: 30px;
    margin: 0 10px;
  `,
  content: css`
    display: flex;
    align-items: center;
  `,
  contentRight: css`
    display: flex;
  `,
  item: css`
    min-width: 70px;
    margin: auto;
  `,
  bookSelector: css`
    color: #98d372;
    font-size: 20px;
  `,
  itemPrefix: css`
    font-weight: 100;
  `
};

export default () => (
  <BookConsumer>
    {({ books, book, changeBook }) => {
      const {
        minimum_price,
        maximum_price,
        minimum_amount,
        maximum_amount,
        minimum_value,
        maximum_value
      } = book;
      const currency1 = book.book.split("_")[0].toUpperCase();
      const currency2 = book.book.split("_")[1].toUpperCase();

      return (
        <ThemeConsumer>
          {({ theme }) => (
            <div
              style={{
                ...theme,
                background: theme.name === "dark" ? "#191e23" : "#cccccc"
              }}
              className={styles.container}
            >
              <DropDown
                containerStyle={
                  theme.name === "light" ? { color: "#466830" } : null
                }
                containerClassName={cx(styles.item, styles.bookSelector)}
                items={books.map(b => ({
                  value: b.book,
                  displayValue: b.book
                    .toUpperCase()
                    .split("_")
                    .join("/")
                }))}
                defaultSelectedItem={book.book}
                onChange={e => {
                  const bookValue = e.target.value;
                  const book = books.find(b => b.book === bookValue);
                  changeBook(book);
                }}
              />

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Volúmen 24hrs.</span>{" "}
                {(+maximum_amount + +minimum_amount) / 2} {currency1}
              </div>

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Max.</span> {maximum_price}{" "}
                {currency2}
              </div>

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Min.</span> {minimum_price}{" "}
                {currency2}
              </div>

              <div className={styles.item}>
                <span className={styles.itemPrefix}>Variacion.</span> {}
                {currency2} 1.4%
              </div>
            </div>
          )}
        </ThemeConsumer>
      );
    }}
  </BookConsumer>
);
