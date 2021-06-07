/**
 *  Copyright 2021 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

import { useState } from "react";
import Cookies from "universal-cookie";

import { isLocalDev } from "../util/env"

const COOKIE_KEY = "OKTA_USERNAME";

// https://stackoverflow.com/questions/62905903/using-document-cookie-in-gatsby
export const useCookie = (key, value, options) => {
  const cookies = new Cookies();
  const [cookie, setCookie] = useState(() => {
    if (cookies.get(key)) {
      return cookies.get(key);
    }
    cookies.set(key, value, options);
  });

  const updateCookie = (value, options) => {
    setCookie(value);
    removeItem(value);
    cookies.set(key, value, options);
  };

  const removeItem = () => {
    cookies.remove(key);
  };

  return [cookie, updateCookie, removeItem];
};

export const authedUsername = (opts = {}) => {
  const defaultUsername = isLocalDev() ? process.env.LDAP_USER : "";
  const [cookie, updateCookie, removeItem] = useCookie(COOKIE_KEY, defaultUsername, opts);

  if (cookie !== defaultUsername) {
    removeItem();
    updateCookie(defaultUsername, opts);
  }

  return defaultUsername;
}
