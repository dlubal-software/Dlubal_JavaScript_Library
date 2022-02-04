// Component can be a name, the component object itself or its current index in the joint.
// Note that index of a component (and with it also access through component object) can change during changing its data.
function setJointComponentSettings(joint, component, settings)
{
    // take its name which is more stable
    if (typeof component == "number")
    {
        component = joint.components[component].name;
    }
    else if (typeof component == "object")
    {
        component = component.name;
    }

    for (var i in settings)
    {
        joint.components[joint.findComponentIndex(component)].settings[i] = settings[i];
    }
}

function getJointComponentProperties(component)
{
    var o = {
        is_active: component.is_active,
        type: component.type,
        name: component.name,
        errors: component.errors,
        settings: {},
        toString: function(roundEpsilon)
        {
            var roundCoeficient = undefined;
            if (typeof roundEpsilon == "number" && 0 < roundEpsilon && roundEpsilon < 1)
            {
                roundCoeficient = Math.round(1 / roundEpsilon);
            }
            return JSON.stringify(this,
                                  function(name, value)
                                  {
                                      if (typeof value == "number" && roundCoeficient)
                                      {
                                          return Math.round(value * roundCoeficient) / roundCoeficient;
                                      }
                                      return value;
                                  });
        }
    };

    var s = component.settings_attributes;
    if (s)
    {
        s = s.split(",");
        for (var i in s)
        {
            var value = component.settings[s[i]];
            if (typeof value == "object" && value)
            {
                value = value.toString();
            }
            o.settings[s[i]] = value;
        }
    }

    return o;
}

function assertAllJointComponents(joint, componentsProperties)
{
    assert(joint.components.row_count(), componentsProperties.length, joint.toString() + ": Wrong count of components");
    for (var i = 1; i <= componentsProperties.length; ++i)
    {
        assert(getJointComponentProperties(joint.components[i]).toString(assertEpsilon), componentsProperties[i - 1],
               joint.toString() + ", Component No. " + i + ": Wrong properties");
    }
}

// Print all components properties of given joint as they can be copied directly to javascript source.
function printAllJointComponents(joint)
{
    for (var i = 1; i <= joint.components.row_count(); ++i)
    {
        print("'" + getJointComponentProperties(joint.components[i]).toString(assertEpsilon).replace(/([\\'])/g, "\\$1") + "',");
    }
}

