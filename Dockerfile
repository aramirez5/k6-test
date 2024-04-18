FROM loadimpact/k6

COPY /tests/chapter_3/http-get.js /tests/chapter_3/http-get.js

CMD ["run", "/tests/chapter_3/http-get.js"]