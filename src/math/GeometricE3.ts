import { Pseudo } from './Pseudo';
import { Scalar } from './Scalar';
import { SpinorE3 } from './SpinorE3';
import { VectorE3 } from './VectorE3';

/**
 *
 */
export interface GeometricE3 extends Pseudo, Scalar, SpinorE3, VectorE3 {
}
