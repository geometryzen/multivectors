import { QQ } from './QQ';
import { DimensionsSummary } from './DimensionsSummary';

/**
 * @hidden
 */
export default function detectDimensions(M: QQ, L: QQ, T: QQ, Q: QQ, temperature: QQ, amount: QQ, intensity: QQ): DimensionsSummary {
    if (M.numer === -1) {
        if (M.denom === 1) {
            if (L.numer === -2) {
                if (L.denom === 1) {
                    if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.INV_MOMENT_OF_INERTIA;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === -1) {
                if (L.denom === 1) {
                    if (T.numer === 2) {
                        if (T.denom === 1) {
                            if (Q.numer === 2) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ELECTRIC_PERMITTIVITY_TIMES_AREA;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 0) {
                if (L.denom === 1) {
                    if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.INV_MASS;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if (M.numer === 0) {
        if (M.denom === 1) {
            if (L.numer === -1) {
                if (L.denom === 1) {
                    if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.INV_LENGTH;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 0) {
                if (L.denom === 1) {
                    if (T.numer === -1) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.INV_TIME;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if (Q.numer === 1) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ELECTRIC_CURRENT;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ONE;
                                                        }
                                                    }
                                                    else if (intensity.numer === 1) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.LUMINOUS_INTENSITY;
                                                        }
                                                    }
                                                }
                                            }
                                            else if (amount.numer === 1) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.AMOUNT_OF_SUBSTANCE;
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                    }
                                    else if (temperature.numer === 1) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.THERMODYNAMIC_TEMPERATURE;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if (Q.numer === 1) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ELECTRIC_CHARGE;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 1) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.TIME;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 2) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.TIME_SQUARED;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 1) {
                if (L.denom === 1) {
                    if (T.numer === -1) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.VELOCITY;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.LENGTH;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 2) {
                if (L.denom === 1) {
                    if (T.numer === -2) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.VELOCITY_SQUARED;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (T.numer === -1) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.RATE_OF_CHANGE_OF_AREA;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.AREA;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 3) {
                if (L.denom === 1) {
                    if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.VOLUME;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if (M.numer === 1) {
        if (M.denom === 1) {
            if (L.numer === 0) {
                if (L.denom === 1) {
                    if (T.numer === -2) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.STIFFNESS;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.MASS;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 1) {
                if (L.denom === 1) {
                    if (T.numer === -2) {
                        if (T.denom === 1) {
                            if (Q.numer === -1) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ELECTRIC_FIELD;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.FORCE;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === -1) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.MOMENTUM;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (L.numer === 2) {
                if (L.denom === 1) {
                    if (T.numer === -2) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ENERGY_OR_TORQUE;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === -1) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.ANGULAR_MOMENTUM;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (T.numer === 0) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.MOMENT_OF_INERTIA;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if (M.numer === 2) {
        if (M.denom === 1) {
            if (L.numer === 2) {
                if (L.denom === 1) {
                    if (T.numer === -2) {
                        if (T.denom === 1) {
                            if (Q.numer === 0) {
                                if (Q.denom === 1) {
                                    if (temperature.numer === 0) {
                                        if (temperature.denom === 1) {
                                            if (amount.numer === 0) {
                                                if (amount.denom === 1) {
                                                    if (intensity.numer === 0) {
                                                        if (intensity.denom === 1) {
                                                            return DimensionsSummary.MOMENTUM_SQUARED;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return void 0;
}
