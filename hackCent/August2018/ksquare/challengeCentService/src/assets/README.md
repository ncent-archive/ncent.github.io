# Assets Directory layout
NOTE: If you add a directory you must describe its purpose here!

## data
This folder contains placeholder data for any part of the application. There is
loose organization, as it represents what might be either a DBMS or a Document-based
Database.

## javascripts
Non-Angular / Non Typescript based scripts that need to be included at the
index.html level ONLY. If your script is not complex, consider converting it into
an angular module, in TypeScript.

## styles
Only CSS files. CSS Files by default are ignored.
SCSS are auto compiled by the gulp task when running, and are located alongside their
components.

## templates
These are specifically html templates for the angular components in the application
