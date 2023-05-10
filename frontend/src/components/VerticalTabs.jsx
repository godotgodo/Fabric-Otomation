import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Orders from './Content Components/Orders';
import Products from './Content Components/Products';
import ProductionLines from './Content Components/ProductionLines';
import Machines from './Content Components/Machines';
import Employees from './Content Components/Employees';
import ProductionReport from './Content Components/ProductionReport';
import EmployeesReport from './Content Components/EmployeesReport';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({authToken}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }} className="h-full min-h-screen"
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }} className='max-w-[13.5rem]'
      >
        <Tab label="İş Emirleri" {...a11yProps(0)} />
        <Tab label="Ürünler Yönetimi" {...a11yProps(1)} />
        <Tab label="Üretim Hattı Yönetimi" {...a11yProps(2)} />
        <Tab label="Makine Yönetimi" {...a11yProps(3)} />
        <Tab label="Personel Yönetimi" {...a11yProps(4)} />
        <Tab label="Üretim İzleme" {...a11yProps(5)} />
        <Tab label="Personel Performans İzleme" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Orders authToken={authToken}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Products authToken={authToken}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductionLines authToken={authToken}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Machines authToken={authToken}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Employees authToken={authToken}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ProductionReport authToken={authToken}/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <EmployeesReport authToken={authToken}/>
      </TabPanel>
    </Box>
  );
}
