## 1. Development Process & Decision-Making

### Technology Choices
- **Flask:** Chosen for its simplicity and flexibility in building lightweight web applications. Flask allows rapid prototyping and easy integration with Pandas for data processing.
- **Pandas:** Used to efficiently manipulate and transform CSV data, enabling easy aggregation, filtering and computation.

### Implementation Steps
1. **Data Processing Logic**
   - The goal was to merge datasets, group by relevant attributes and count votes separately based on their type.
   - Encountered an issue where one `legislator_id` value in the bills dataset did not match existing legislators, requiring special handling.
   - Used `map` with a lambda function to convert `NaN` values to `0` and ensure correct data types.
   
2. **Frontend and Basic Table Structure**
   - Initially implemented a simple HTML table without styling to display data.
   - Applied basic CSS for better structure and responsiveness.

3. **Enhancing User Experience**
   - Added filtering options to help users navigate large datasets.
   - Extracted Quorum's color scheme from DevTools and applied it to maintain visual consistency with their branding.
   - Organized data into tabs to improve navigation.
   - Created an `Overview` section to summarize key statistics (latest voted bills, total bills, total legislators).
   - Added a detailed view of each bill, showing supporters and opposers.

### Possible Future Improvements
- **Scalability:** Implement pagination for both tables for possible large datasets, ensuring scalability.
- **Edge Case Considerations:** Further refinement of data handling and potential issues.
- **Testing:** Normally, testing is one of the first steps, but due to time constraints, it was prioritized last.
- **Navigation:** Create new routes.
- **Dynamic Handling:** Create i18n, interfaces and enums.
- **Empty State Handling:** Display a clear message when no results are found.
- **Better Table Styling:** Adjust row colors dynamically when filters are applied.
- **Mobile Optimization:** Improve responsiveness for smaller screens.

## 2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or“Co-Sponsors”?
- The data processing pipeline is structured to allow easy additions of new columns.
- Future columns can be incorporated by modifying the Pandas DataFrame to include new attributes.
- Improvement of HTML columns to be dynamic, using `for` and i18n.
- If new relationships are introduced (e.g., co-sponsors), additional joins/merges between datasets can be implemented dynamically.

## 3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?
- If the application were required to generate CSVs instead of processing them, a structured export function would be implemented.
- The system would query internal data structures to construct a CSV dynamically using Pandas’ `to_csv()` function.
- This would require defining a standardized schema and ensuring consistency in data fields.

## 4. How long did you spend working on the assignment?
- 6 hours.