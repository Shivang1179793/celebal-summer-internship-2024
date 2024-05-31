# To-Do List Component

## Overview
This document provides guidance on how to test the To-Do List component to ensure its functionality and reliability. The To-Do List component allows users to add, remove, and mark tasks as completed. Additionally, it supports task sorting and filtering, with data persistence via localStorage.

## Prerequisites
- Node.js and npm installed
- The To-Do List React app set up and running

## Test Scenarios

### 1. Adding a Task
**Steps:**
1. Open the To-Do List application.
2. Enter a new task in the input field.
3. Click the "Add Task" button.

**Expected Outcome:**
- The new task should appear in the task list.
- The input field should be cleared after adding the task.

### 2. Removing a Task
**Steps:**
1. Add a task if none are present.
2. Click the "Remove" button next to the task you want to delete.

**Expected Outcome:**
- The selected task should be removed from the task list.

### 3. Marking a Task as Completed
**Steps:**
1. Add a task if none are present.
2. Click on the task text to mark it as completed.

**Expected Outcome:**
- The task text should have a line-through decoration indicating completion.
- Clicking the task text again should unmark it as completed.

### 4. Filtering Tasks
**Steps:**
1. Add multiple tasks, marking some as completed.
2. Use the filter dropdown to select "All", "Completed", and "Incomplete".

**Expected Outcome:**
- "All" should display all tasks.
- "Completed" should display only the tasks marked as completed.
- "Incomplete" should display only the tasks not marked as completed.

### 5. Sorting Tasks
To add optional sorting to the todo list, we can introduce a sorting mechanism that allows users to sort the tasks by various criteria, such as by task name, creation date, or completion status.

**Steps:**
1. Add multiple tasks with different names and completion statuses.
2. Use the sort dropdown to select sorting criteria such as "Task Name", "Creation Date", or "Completion Status".

### 6. Data Persistence
**Steps:**
1. Add multiple tasks.
2. Refresh the browser.

**Expected Outcome:**
- The tasks should persist and appear in the task list after the page reloads.

## Manual Testing Tips
- Ensure that task input validation works (i.e., prevent adding empty tasks).
- Verify the behavior of the application across different browsers and devices.
- Test edge cases, such as adding tasks with the same name.

## Automated Testing (Optional)
Consider writing automated tests using a testing library like Jest with React Testing Library. Example tests could include:
- Rendering the component and checking initial state.
- Simulating user interactions such as adding, removing, and completing tasks.
- Verifying that the localStorage integration works as expected.

## Conclusion
Follow these testing steps to ensure the To-Do List component functions correctly. Document any issues or bugs discovered during testing and address them as needed.
## Website
Check out the live application: [To-Do List App](https://to-do-list-60.netlify.app/)

## To-Do List App Screenshot

![Screenshot (204)](https://github.com/Shivang1179793/celebal-summer-internship-2024/assets/91139730/45afb992-68c9-46b5-b9dc-671191642d9a)
