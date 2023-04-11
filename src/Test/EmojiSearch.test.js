import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import emojiList from "../emojiList.json";

describe("Emoji Test", () => {
  let header;
  let listElement;
  let searchInput;

  beforeEach(() => {
    //App class nın render kontrolü sağlandı
    render(<App />);
    header = screen.getByText("Emoji Search"); // başlık texti alınıp render kontrolü yapıldı
    listElement = screen.getByText("Joy");
    searchInput = screen.getByLabelText("inputTest");
  });
  test("header render", () => {
    expect(header).toBeInTheDocument();
  });
  test("emoji list render", () => {
    let emojies = emojiList.slice(0, 15);
    //expect fonksiyonunu kullanarak bu öğenin sayfada görüntülenip görüntülenmediğini kontrol ediyoruz.
    //Eğer öğe sayfada görüntülenmişse, toBeInTheDocument() fonksiyonu true değerini döndürür
    emojies.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
  test("render after filter", () => {
    const value = "Joy";
    //search input alanına default bir değer ataması yapılır
    userEvent.type(searchInput, value);
    expect(screen.getByText(value)).toBeInTheDocument();
  });
  test("copy to clickboard test", () => {
    userEvent.click(listElement);
    expect(
      listElement.parentElement.getAttribute("data-clipboard-text")
    ).toMatch("😂");
  });
});
