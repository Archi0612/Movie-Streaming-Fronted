import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import * as matchers from '@testing-library/jest-dom/matchers';
import 'jest';

expect.extend(matchers);
