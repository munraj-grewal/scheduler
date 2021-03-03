import React from "react";
import { render, cleanup, waitForElement, queryByText, getByTestId } from "@testing-library/react";
import Application from "components/Application";
import { fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react/dist";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
    
  });

  it("Loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument()
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument()
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument()
    await waitForElement(() => getByText(day, "no spots remaining"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"))
  const appointment = getAllByTestId(container, "appointment")[1]
  fireEvent.click(getByAltText(appointment, "Delete"))
  expect(getByText(appointment, "Confirm")).toBeInTheDocument()
  expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument()
  fireEvent.click(getByText(appointment, "Confirm"))
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument()
  await waitForElement(() => getByAltText(appointment, "Add"))
  expect(queryByText(container, "Archie Cohen")).toBe(null)
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    const appointment = getAllByTestId(container, "appointment")[1]
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Edit"))
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument()
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not save or delete appointment, please try again")).toBeInTheDocument()
    fireEvent.click(getByAltText(appointment, "Close"))
    await waitForElement(() => getByText(container, "Save"))
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument()
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment")[1]
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "Confirm")).toBeInTheDocument()
    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument()
    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Error"))
    expect(getByText(appointment, "Could not save or delete appointment, please try again")).toBeInTheDocument()
    fireEvent.click(getByAltText(appointment, "Close"))
    await waitForElement(() => getByText(container, "Archie Cohen"))
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument()
  });
});