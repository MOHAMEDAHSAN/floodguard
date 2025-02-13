import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Helpline = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Household
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numElderly, setNumElderly] = useState(0);
  
  // Vulnerabilities
  const [wheelchairUser, setWheelchairUser] = useState(false);
  const [blindness, setBlindness] = useState(false);
  const [otherDisabilities, setOtherDisabilities] = useState(false);
  
  // Medical Emergencies
  const [injuryStatus, setInjuryStatus] = useState<'none' | 'fracture' | 'bleeding' | 'multiple-injuries'>('none');
  const [diabetes, setDiabetes] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);
  const [dialysisDependent, setDialysisDependent] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyTrimester, setPregnancyTrimester] = useState<'none' | 'first' | 'second' | 'third'>('none');
  
  // Immediate Needs
  const [daysWithoutSupplies, setDaysWithoutSupplies] = useState(0);
  const [medicineNeeded, setMedicineNeeded] = useState(false);
  const [toiletAccess, setToiletAccess] = useState(false);
  
  // Environmental Risks
  const [waterLevel, setWaterLevel] = useState<'knee-high' | 'waist-high' | 'chest-high' | 'neck-high'>('knee-high');
  const [structuralDamage, setStructuralDamage] = useState<'none' | 'cracked-walls' | 'collapsed-structure'>('none');
  const [vehiclesSubmerged, setVehiclesSubmerged] = useState(0);
  
  // Location
  const [area, setArea] = useState('');
  const [otherArea, setOtherArea] = useState('');
  const [isOtherArea, setIsOtherArea] = useState(false);
  
  // Additional Info
  const [additionalInfo, setAdditionalInfo] = useState('');

  const calculatePriorityScore = () => {
    const disabilityCount = Number(wheelchairUser) + Number(blindness) + Number(otherDisabilities);
    const chronicConditionsCount = Number(diabetes) + Number(heartDisease) + Number(dialysisDependent);
    
    const injurySeverityScore = {
      'none': 0,
      'fracture': 0.5,
      'bleeding': 0.7,
      'multiple-injuries': 1
    }[injuryStatus];

    const waterLevelScore = {
      'knee-high': 0.25,
      'waist-high': 0.5,
      'chest-high': 0.75,
      'neck-high': 1
    }[waterLevel];

    const structuralDamageScore = {
      'none': 0,
      'cracked-walls': 0.5,
      'collapsed-structure': 1
    }[structuralDamage];

    return (
      (numChildren * 0.25) +
      (numElderly * 0.30) +
      (disabilityCount * 0.40) +
      (injurySeverityScore * 0.35) +
      (chronicConditionsCount * 0.30) +
      (isPregnant ? 0.25 : 0) +
      ((3 - daysWithoutSupplies) * -0.15) +
      (medicineNeeded ? 0.20 : 0) +
      (!toiletAccess ? 0.15 : 0) +
      (waterLevelScore * 0.50) +
      (structuralDamageScore * 0.45) +
      (vehiclesSubmerged * 0.10)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const priorityScore = calculatePriorityScore();
      const disabilityCount = Number(wheelchairUser) + Number(blindness) + Number(otherDisabilities);
      const chronicConditionsCount = Number(diabetes) + Number(heartDisease) + Number(dialysisDependent);

      const { error } = await supabase
        .from('helpline_responses')
        .insert({
          num_adults: numAdults,
          num_children: numChildren,
          num_elderly: numElderly,
          wheelchair_user: wheelchairUser,
          blindness: blindness,
          other_disabilities: otherDisabilities,
          disability_count: disabilityCount,
          injury_status: injuryStatus,
          diabetes: diabetes,
          heart_disease: heartDisease,
          dialysis_dependent: dialysisDependent,
          chronic_conditions_count: chronicConditionsCount,
          is_pregnant: isPregnant,
          pregnancy_trimester: isPregnant ? pregnancyTrimester : 'none',
          days_without_supplies: daysWithoutSupplies,
          medicine_needed: medicineNeeded,
          toilet_access: toiletAccess,
          water_level: waterLevel,
          structural_damage: structuralDamage,
          vehicles_submerged: vehiclesSubmerged,
          area: isOtherArea ? otherArea : area,
          additional_info: additionalInfo,
          priority_score: priorityScore
        });

      if (error) throw error;

      toast({
        title: "Help request submitted",
        description: "Your emergency help request has been recorded. Priority score: " + priorityScore.toFixed(2),
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit help request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-background pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Emergency Help Request Form</h1>
        </div>

        <Card className="p-8 space-y-8 bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
          <p className="text-muted-foreground">Please provide accurate information to help us assess your situation.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Household Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">People in Household</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Number of Adults (18-60 years)</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNumAdults(prev => Math.max(0, prev - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={numAdults}
                      onChange={(e) => setNumAdults(parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNumAdults(prev => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Number of Children (under 18)</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNumChildren(prev => Math.max(0, prev - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={numChildren}
                      onChange={(e) => setNumChildren(parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNumChildren(prev => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Number of Elderly (60+ years)</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNumElderly(prev => Math.max(0, prev - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={numElderly}
                      onChange={(e) => setNumElderly(parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNumElderly(prev => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vulnerabilities Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vulnerabilities</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wheelchair"
                    checked={wheelchairUser}
                    onCheckedChange={(checked) => setWheelchairUser(checked as boolean)}
                  />
                  <label
                    htmlFor="wheelchair"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Wheelchair User
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="blindness"
                    checked={blindness}
                    onCheckedChange={(checked) => setBlindness(checked as boolean)}
                  />
                  <label
                    htmlFor="blindness"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Blindness
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="otherDisabilities"
                    checked={otherDisabilities}
                    onCheckedChange={(checked) => setOtherDisabilities(checked as boolean)}
                  />
                  <label
                    htmlFor="otherDisabilities"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Other Disabilities
                  </label>
                </div>
              </div>
            </div>

            {/* Medical Emergencies Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Medical Emergencies</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Injuries</Label>
                  <Select value={injuryStatus} onValueChange={(value: any) => setInjuryStatus(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select injury status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="fracture">Fracture</SelectItem>
                      <SelectItem value="bleeding">Bleeding</SelectItem>
                      <SelectItem value="multiple-injuries">Multiple Injuries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Chronic Conditions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="diabetes"
                        checked={diabetes}
                        onCheckedChange={(checked) => setDiabetes(checked as boolean)}
                      />
                      <label htmlFor="diabetes">Diabetes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="heartDisease"
                        checked={heartDisease}
                        onCheckedChange={(checked) => setHeartDisease(checked as boolean)}
                      />
                      <label htmlFor="heartDisease">Heart Disease</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dialysis"
                        checked={dialysisDependent}
                        onCheckedChange={(checked) => setDialysisDependent(checked as boolean)}
                      />
                      <label htmlFor="dialysis">Dialysis Dependent</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Pregnancy Status</Label>
                    <RadioGroup value={isPregnant ? "yes" : "no"} onValueChange={(value) => {
                      setIsPregnant(value === "yes");
                      if (value === "no") setPregnancyTrimester('none');
                    }}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="pregnant-yes" />
                        <Label htmlFor="pregnant-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="pregnant-no" />
                        <Label htmlFor="pregnant-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {isPregnant && (
                    <div>
                      <Label>Trimester</Label>
                      <Select value={pregnancyTrimester} onValueChange={(value: any) => setPregnancyTrimester(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trimester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first">First Trimester</SelectItem>
                          <SelectItem value="second">Second Trimester</SelectItem>
                          <SelectItem value="third">Third Trimester</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Immediate Needs Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Immediate Needs</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Days Without Food/Water: {daysWithoutSupplies}</Label>
                  <Slider
                    value={[daysWithoutSupplies]}
                    onValueChange={(value) => setDaysWithoutSupplies(value[0])}
                    min={0}
                    max={3}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Medicine Needed</Label>
                  <RadioGroup value={medicineNeeded ? "yes" : "no"} onValueChange={(value) => setMedicineNeeded(value === "yes")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="medicine-yes" />
                      <Label htmlFor="medicine-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="medicine-no" />
                      <Label htmlFor="medicine-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Toilet Access</Label>
                  <RadioGroup value={toiletAccess ? "yes" : "no"} onValueChange={(value) => setToiletAccess(value === "yes")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="toilet-yes" />
                      <Label htmlFor="toilet-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="toilet-no" />
                      <Label htmlFor="toilet-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Environmental Risks Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Environmental Risks</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Water Level</Label>
                  <Select value={waterLevel} onValueChange={(value: any) => setWaterLevel(value)}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select water level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      <SelectItem value="knee-high">Knee High</SelectItem>
                      <SelectItem value="waist-high">Waist High</SelectItem>
                      <SelectItem value="chest-high">Chest High</SelectItem>
                      <SelectItem value="neck-high">Neck High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Structural Damage</Label>
                  <Select value={structuralDamage} onValueChange={(value: any) => setStructuralDamage(value)}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select structural damage" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="cracked-walls">Cracked Walls</SelectItem>
                      <SelectItem value="collapsed-structure">Collapsed Structure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Vehicles Submerged</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setVehiclesSubmerged(prev => Math.max(0, prev - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={vehiclesSubmerged}
                      onChange={(e) => setVehiclesSubmerged(parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setVehiclesSubmerged(prev => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Area</Label>
                  <Select 
                    value={isOtherArea ? "other" : area} 
                    onValueChange={(value) => {
                      if (value === "other") {
                        setIsOtherArea(true);
                        setArea("");
                      } else {
                        setIsOtherArea(false);
                        setArea(value);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      <SelectItem value="Ayanavaram">Ayanavaram</SelectItem>
                      <SelectItem value="Guindy">Guindy</SelectItem>
                      <SelectItem value="Avadi">Avadi</SelectItem>
                      <SelectItem value="Anna Nagar">Anna Nagar</SelectItem>
                      <SelectItem value="T Nagar">T Nagar</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isOtherArea && (
                  <div>
                    <Label>Specify Area</Label>
                    <Input
                      value={otherArea}
                      onChange={(e) => setOtherArea(e.target.value)}
                      placeholder="Enter your area"
                      className="bg-white dark:bg-gray-800"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Please provide any additional information that might be important..."
                className="min-h-[100px] bg-white dark:bg-gray-800"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Help Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Helpline;
