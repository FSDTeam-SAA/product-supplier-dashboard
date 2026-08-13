const fs = require('fs');
const path = require('path');

const supplierRoutes = [
  'overview',
  'categories',
  'products',
  'orders',
  'payments',
  'store-profile',
  'security'
];

const serviceRoutes = [
  'dashboard-overview',
  'my-profile',
  'my-services',
  'enquiries',
  'settings'
];

function createPage(base, route) {
  const dirPath = path.join(__dirname, 'app', '(dashboard)', base, route);
  fs.mkdirSync(dirPath, { recursive: true });
  const content = `export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">${route.replace(/-/g, ' ')} Page</h1>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
}

supplierRoutes.forEach(r => createPage('supplier', r));
serviceRoutes.forEach(r => createPage('service', r));

console.log('Pages created successfully.');
