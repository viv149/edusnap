
/**
 * Utility functions for Google Sheets integration
 */

export interface SheetNotice {
  category: string;
  title: string;
  date: string;
  description: string;
  link: string;
}

export interface SheetLink {
  title: string;
  description: string;
  url: string;
  icon: string;
}

/**
 * Fetches notice data from a Google Sheet via SheetDB API
 * @param URL The Google Sheet URL or SheetDB endpoint ID
 * @returns An array of notices
 */
export const fetchNoticesFromSheet = async (URL: string): Promise<SheetNotice[]> => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.data as SheetNotice[];
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw error;
  }
};


/**
 * IGNOU Help Hub Google Sheet Formats
 * 
 * Below are the recommended formats for different sections of the website.
 * Each section should be maintained on a separate sheet within the same Google Sheets document.
 */

/**
 * 1. Notices Format (Sheet Name: Notices)
 * 
 * Required columns:
 * - category: Type of notice (Admission, Examination, Assignment, Results)
 * - title: The notice title
 * - date: Format: Month Day, Year (e.g., April 10, 2025)
 * - description: A brief description of the notice
 * - link: URL to the full notice
 * 
 * Example row:
 * | category     | title                      | date           | description                                  | link                       |
 * |--------------|----------------------------|----------------|----------------------------------------------|----------------------------|
 * | Examination  | Term-end Exam Schedule     | June 1, 2025   | June 2025 TEE schedule now available         | https://exam.ignou.ac.in   |
 * | Assignment   | Assignment Submission Date | April 30, 2025 | Last date for submission of assignments      | https://ignou.ac.in/assign |
 */

/**
 * 2. Official Portals Format (Sheet Name: OfficialPortals)
 * 
 * Required columns:
 * - title: Name of the portal
 * - description: Brief description of what this portal is for
 * - url: Complete URL to the portal
 * - icon: Icon name from Lucide React (e.g., "globe", "users", "file")
 * 
 * Example row:
 * | title           | description                                | url                            | icon   |
 * |-----------------|--------------------------------------------|---------------------------------|--------|
 * | IGNOU Home Page | Official website of IGNOU                  | https://ignou.ac.in/           | globe  |
 * | Admission Portal| Register and apply for IGNOU programs      | https://ignouadmission.samarth.edu.in/ | users  |
 */

/**
 * 3. Academic Resources Format (Sheet Name: AcademicResources)
 * 
 * Required columns:
 * - title: Name of the resource
 * - description: Brief description of the resource
 * - url: Complete URL to access the resource
 * - icon: Icon name from Lucide React
 * 
 * Example row:
 * | title     | description                           | url                         | icon     |
 * |-----------|---------------------------------------|-----------------------------|----------|
 * | eGyankosh | Access study materials and resources  | http://egyankosh.ac.in/     | bookOpen |
 * | Assignment Status | Check your assignment submission status | https://admission.ignou.ac.in/changeadmdata/StatusAssignment.ASP | fileText |
 */

/**
 * 4. Examinations Format (Sheet Name: Examinations)
 * 
 * Required columns:
 * - title: Name of examination related link
 * - description: Brief description
 * - url: Complete URL
 * - icon: Icon name from Lucide React
 * 
 * Example row:
 * | title                | description                        | url                        | icon      |
 * |----------------------|------------------------------------|----------------------------|-----------|
 * | Exam Form Submission | Apply for term-end examinations    | https://exam.ignou.ac.in/  | fileText  |
 * | Grade Card / Results | Check your examination results     | https://ignou.ac.in/ignou/studentzone/results/1 | award     |
 */

/**
 * 5. Support Links Format (Sheet Name: Support)
 * 
 * Required columns:
 * - title: Name of support resource
 * - description: Brief description of the support
 * - url: Complete URL
 * - icon: Icon name from Lucide React
 * 
 * Example row:
 * | title                | description                           | url                                        | icon    |
 * |----------------------|---------------------------------------|-------------------------------------------|---------|
 * | Regional Centre List | Find your nearest IGNOU Regional Centre | https://ignou.ac.in/ignou/aboutignou/regional/website | mapPin |
 * | Student Support      | Get help with various student services | http://www.ignou.ac.in/ignou/studentzone | globe   |
 */

/**
 * Instructions for setting up Google Sheets for website updates:
 * 
 * 1. Create a new Google Sheet with separate sheets for each section:
 *    - Notices
 *    - OfficialPortals
 *    - AcademicResources
 *    - Examinations
 *    - Support
 * 
 * 2. For each sheet, use the column headers exactly as described above
 * 
 * 3. Publish the sheet to the web:
 *    - File > Share > Publish to web
 *    - Select "Entire Document" or specific sheets
 *    - Click "Publish"
 * 
 * 4. Create a SheetDB API endpoint:
 *    - Go to https://sheetdb.io/
 *    - Create an account
 *    - Create a new API using your Google Sheet URL
 *    - Copy the API endpoint ID
 * 
 * 5. Update the sheetId in the components that use this data:
 *    - NoticesSection.tsx for notices
 *    - ImportantLinks.tsx for the other sections
 */

// Available Lucide icons for use in the sheets:
// globe, users, file, fileText, award, mapPin, bookOpen,
// graduation-cap, bell, calendar, clock, helpCircle, info,
// link, mail, messageSquare, phone, settings, user

export const fetchLinksFromSheet = async (url: string): Promise<SheetLink[]> => {
  try {
    // Add sheet name to the API endpoint to fetch specific sheet data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    console.log("Impotanrt", data);
    return data.data as SheetLink[];
  } catch (error) {
    console.error(`Error fetching sheet data:`, error);
    throw error;
  }
};
