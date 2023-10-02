# Passover Calendar event script for ExAlta 2 satellites
This script automates the creation of google calendar events for future satellite passes in the AlbertaSat calendar. This script will only work if the information in the passover spread sheet, which contains date and time info for future passes, is accurate, and the spread sheets format remains the same. For now columns and rows are accessed directly and thus deleting or moving an entire column or row may cause this script to break or operate in an unexpected manor. 


## How to use the google script to automatically create calendar events based on spread sheet passover data:
1. Add new passover data to the spreadsheet from gpredict. Do not change column order or spreadsheet layout. Do not delete the entire column, instead only delete the data you needed. (for now) Cells in column AA and AB use an equation to calc date time which this scripts NEEDS.  

2. Open the spreadsheet and click extensions>appscripts. This should take you to a page that displays the 'Add_passovers_to_calendar' script. 

3. Click run to run the script, the execution log will tell you which calendar events were added, if any.

### NOTES: 
- Each passover should have a UNIQUE ID NUMBER. So when creating new passovers in the spread sheet be sure to continue incrementing the id number from the last previous pass.
- When adding passes, you must ensure the formatting for all cells remains as is.
- The name of the event is created based on the passover unique id, and the name of the satellites by which communication attempts will be made.
- Columns AA and AB are use to hold an amalgamated date-time referencing the date and time columns entered in for AOS and LOS.  
- Double check at least one of the added calendar events matches the expected time, to ensure the script is working as expected. I had to do some janky stuff because of how sheets formats cells for date time..... 
