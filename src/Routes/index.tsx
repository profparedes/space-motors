import { memo } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Cart from 'pages/Cart';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/:id/:name" element={<Cart />} />
        {/* <Route path="/credit/:id/:name" element={<CreditConfirmation />} />
        <Route path="/bank/:id/:name" element={<BankConfirmation />} /> */}
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Routes);
