import { Pseudo } from './Pseudo';
import { Scalar } from './Scalar';
import { SpinorM21 } from './SpinorM21';
import { VectorM21 } from './VectorM21';

/**
 *
 */
export interface GeometricM21 extends Pseudo, Scalar, SpinorM21, VectorM21 {
}
