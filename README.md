# sti-tool-letter
_Utility to write a letter to a politician of trust_

[DEMO (branch fivek-dev-standalone)](https://fivekWBassMachine.github.io/sti-tool-letter/index-en_US.html)

## Flow

### Setup

1) Init
   1) ScrollHelper _Utility to scroll to the next headline_
   2) Letter _'Storage' of the user input_
   3) Search Bar _Utility; Searches the politicians table and hides non-matching politicians_
2) DOM (1)
   1) display contents _i.e. unhide hidden contents_
   2) set title to `document.title`
3) API Requests
   1) info _i.e. motd_
   2) scopes & politicians
   3) topics
4) DOM (2)
   1) info
   2) scopes & politicians _(the table is filled with the politicians of the 1st scope)_
   3) topics _(order is kept)_

### Loop

1) User: selects scope
   ```
   main/listener:
   > main/f updatePoliticiansTable(scope):
     > DOM
       > table is resetted and then filled with all politicians of the scope
     > [R] letter.receiver
   ```
2) **[Not Implemented]** User: searches politicians
   ```
   main/listener:
   > parse query
   > DOM
     > iterates through every row and hides every non-matching/ un-hides every matching row
   ```
3) User: selects politician
   ```
   main/listener:
   > DOM
     > row with politician is marked
   > [S] letter.receiver
   > `scrollHelper.scrollTo(letter.topics.length == 0 ? 'topics' : (letter.hasSender() ? 'edit' : 'sender'));`
   ```
4) User: submits topics form
   ```
   main/listener:
   > query request (because the textarea will be resetted)
     -> reset form to previous state from letter
      > collect form data
      > [R] letter.topics
      > [S] letter.topics
   > `scrollHelper.scrollTo(letter.hasSender() ? 'edit' : 'sender');`
   ```
5) User: submits sender form
   ```
   main/listener:
   > collect & validate form data
     -> `notify('invalid address')`
     +> [S] letter.sender
      > `scrollHelper.scrollTo('edit');`
   ```
6) **[Not Implemented]** User: modifies textarea
   ```
   main/listener
   > DOM
     > disable all topic checkboxes
     > enable 'Undo Changes' button
   ```
7) **[Not Implemented]** User: clicks undo changes
   ```
   main/listener
   > query request (because textarea will be resetted)
     +> `letter.build()`
      > DOM
        > disable 'Undo Changes' button
   ```
8) **[Not Implemented]** User: clicks on download or print
   ```
   main/listener:
   > is allowed
     -> `notify('missing data')`
     +> `letter.generate()`
      > clicked is download
        -> print intent
        +> download intent
   ```