function OptimizationDescendingGlobalParameter(name,
                                               symbol,
                                               unit_group,
                                               value,
                                               min,
                                               max,
                                               increment,
                                               steps,
                                               comment)
{
    engine.create_optimization_descending_global_parameter(name, symbol, unit_group, value, min, max, increment, steps, comment);
}
