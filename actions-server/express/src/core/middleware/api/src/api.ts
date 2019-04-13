
/**
 * api http request middleware
 * 
 * - the api can be webpub manifest
 * - or Daisy 2.02
 * - or Epub3
 * - ...
 * 
 * handle 
 * 
 * interface with keyof of this interface in node.interface
 * how do implement this ?
 * 
 * in clear doing an interface api implement in node
 * 
 * 
 * in the api allow multiple interface type 
 * for each route
 * like :
 * - discovery catalog route
 * - search book route
 * - whatever
 * 
 */

import axios from 'axios';

export const get = async <T>(url: string) => new Promise<T>((resolve, reject) => {
  axios.get<T>(url).then((data) => resolve(data.data)).catch((e) => reject(e));
});