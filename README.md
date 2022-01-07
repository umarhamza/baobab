Kaabilo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
require('dotenv').config();
const { google } = require('googleapis');

const client = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Connected');
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({
    version: 'v4',
    auth: cl,
  });

  const opt = {
    spreadsheetId: process.env.SHEET_ID_1,
    range: 'Data!A2:C100',
  };

  let res = await gsapi.spreadsheets.values.get(opt);
  let dataArray = res.data.values;

  let numberOfCols = 0;

  dataArray.forEach(function (item) {
    if (item.length > numberOfCols) {
      numberOfCols = item.length;
    }
  });

  dataArray = dataArray.map(function (item) {
    while (item.length < numberOfCols) {
      item.push('');
    }

    return item;
  });

  console.log(dataArray);

  let newDataArray = dataArray.map(function (item) {
    item.push(item[0] + '-' + item[1] + '-' + item[2]);
    return item;
  });

  const updateOpt = {
    spreadsheetId: process.env.SHEET_ID_1,
    range: 'Data!E2',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: newDataArray,
    },
  };

  let updateRes = await gsapi.spreadsheets.values.update(updateOpt);

  console.log(updateRes);
}

```

# JUNK

```
export async function getServerSideProps({ query }) {
  const { id } = query;
  const rowNumber = parseInt(id) + 1;

  const auth = await google.auth.getClient({
    credentials: {
      client_email: process.env.client_email,
      private_key: process.env.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Data!A${rowNumber}:C${rowNumber}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.sheet_id_1,
    range,
  });

  return {
    props: {
      data: response.data.values,
    },
  };
}

```
