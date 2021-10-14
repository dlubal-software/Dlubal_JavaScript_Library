function OptimizationAscendingGlobalParameter(name,
                                                symbol,
                                                unit_group,
                                                value,
                                                min,
                                                max,
                                                increment,
                                                steps,
                                                comment)
{
    engine.create_optimization_ascending_global_parameter(name, symbol, unit_group, value, min, max, increment, steps, comment);
}
