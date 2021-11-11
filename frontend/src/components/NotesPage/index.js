import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { getNote } from '../../store/note';
import { getNotebook } from '../../store/notebook';
