[![version](https://img.shields.io/npm/v/@geometryzen/multivectors.svg)](https://www.npmjs.com/package/@geometryzen/multivectors) 

[![npm downloads](https://img.shields.io/npm/dm/@geometryzen/multivectors.svg)](https://npm-stat.com/charts.html?package=@geometryzen/multivectors&from=2022-09-01)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

# Geometric Algebra Multivectors For Numeric Computing

## Overview

A collection of multivectors for numeric computation. A multivector is a generalization of vector and scalar quantities that is closed under multiplication.

The following geometric quantities are supported.

<table>
    <thead>
        <tr>
            <td>Class</td>
            <td>p</td>
            <td>q</td>
            <td>Metric</td>
            <td>Coordinates</td>
            <td>Basis Vectors</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Geometric1</td>
            <td>1</td>
            <td>0</td>
            <td>Euclidean</td>
            <td>a,x,x or b</td>
            <td>e1</td>
        </tr>
        <tr>
            <td>Geometric2</td>
            <td>2</td>
            <td>0</td>
            <td>Euclidean</td>
            <td>a,x,y,xy or b</td>
            <td>e1,e2</td>
        </tr>
        <tr>
            <td>Geometric3</td>
            <td>3</td>
            <td>0</td>
            <td>Euclidean</td>
            <td>a,x,y,z,xy,yz,zx,xyz or b</td>
            <td>e1,e2,e3</td>
        </tr>
        <tr>
            <td>Spacetime1</td>
            <td>1</td>
            <td>1</td>
            <td>Minkowski</td>
            <td>a,t,x,tx or b</td>
            <td>e0,e1</td>
        </tr>
        <tr>
            <td>Spacetime2</td>
            <td>2</td>
            <td>1</td>
            <td>Minkowski</td>
            <td>a,t,x,y,tx,ty,xy,txy or b</td>
            <td>e0,e1,e2</td>
        </tr>
    </tbody>
</table>

p is the number of space dimensions,  q is the number of time dimensions.

All types have:

* Cartesian coordinates
* static zero (0) constant.
* static one (1) constant.
* static basis vector constants e.g. e1, e2, e3
* Unit of measure or Dimensionless
* static S.I. Unit constants e.g. kilogram, meter, second, ampere, ...
* Lockable to support immutability or mutation.
* Dunder methods for operator overloading (if supported by execution environment).  

## Documentation

https://geometryzen.github.io/multivectors

## Quick Start

### npm

https://www.npmjs.com/package/@geometryzen/multivectors

```typescript
import {Geometric3} from '@geometryzen/multivectors'

const e1 = Geometric3.e1
```
### Locking

The ability to lock a multivector provides both unsurprising behavior and efficiency. In general, mutability is efficient because it can be used to avoid the creation of temporary objects that must be garbage collected. On the other hand, immutability avoids surprising changes in variables, is useful for avoiding the need to explicitly clone mutable objects, and provides support for operator overloading. 

* Locked multivectors are not mutable; their methods create new instances which are also locked.
* Unlocked multivector methods may modify the target.
* All static constants are locked.
* Multivectors may be cloned to create unlocked instances.
* Locking returns a token that may be used to unlock later.
* Dunder methods for operator overloading never change the target and create new locked instances.

## Distribution

### CommonJS

https://unpkg.com/@geometryzen/multivectors/dist/cjs/index.js

### ESM

https://unpkg.com/@geometryzen/multivectors/dist/esm/index.js

https://unpkg.com/@geometryzen/multivectors/dist/esm/index.min.js

### System

https://unpkg.com/@geometryzen/multivectors/dist/system/index.js

https://unpkg.com/@geometryzen/multivectors/dist/system/index.min.js

### UMD

https://unpkg.com/@geometryzen/multivectors/dist/umd/index.js

https://unpkg.com/@geometryzen/multivectors/dist/umd/index.min.js

### Type Definitions

https://unpkg.com/@geometryzen/multivectors/dist/index.d.ts

## Support

Please file issues at https://github.com/geometryzen/multivectors/issues

Copyright (c) 2022 David Geo Holmes.

This software is licensed under the MIT License.
