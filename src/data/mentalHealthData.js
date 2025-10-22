export const mentalHealthDisorders = [
  {
    title: "Anxiety Disorders",
    description: "Excessive worry, fear, or nervousness that interferes with daily activities. Affects 40 million adults in the US annually.",
    symptoms: ["Restlessness", "Fatigue", "Difficulty concentrating", "Irritability", "Muscle tension", "Rapid heartbeat", "Sweating", "Panic attacks"],
    resources: ["Cognitive Behavioral Therapy", "Mindfulness practices", "Support groups", "Medication", "Exposure therapy"],
    prevalence: "18.1% of US adults",
    treatment: "Highly treatable with therapy and medication"
  },
  {
    title: "Depression",
    description: "Persistent feelings of sadness, hopelessness, and loss of interest in activities. One of the leading causes of disability worldwide.",
    symptoms: ["Persistent sadness", "Loss of interest", "Changes in appetite", "Sleep disturbances", "Fatigue", "Feelings of worthlessness", "Difficulty concentrating", "Thoughts of death"],
    resources: ["Professional counseling", "Medication (SSRIs/SNRIs)", "Exercise", "Social support", "Light therapy"],
    prevalence: "8.4% of US adults",
    treatment: "Effective treatment available for 80-90% of cases"
  },
  {
    title: "Bipolar Disorder",
    description: "Extreme mood swings that include emotional highs (mania) and lows (depression). Affects approximately 2.8% of US adults.",
    symptoms: ["Manic episodes", "Depressive episodes", "Changes in energy", "Impaired judgment", "Racing thoughts", "Grandiose beliefs", "Risky behavior"],
    resources: ["Mood stabilizers", "Psychotherapy", "Lifestyle management", "Support groups", "Family therapy"],
    prevalence: "2.8% of US adults",
    treatment: "Manageable with proper treatment and support"
  },
  {
    title: "Post-Traumatic Stress Disorder (PTSD)",
    description: "A mental health condition triggered by experiencing or witnessing a terrifying event. Can develop after any traumatic experience.",
    symptoms: ["Flashbacks", "Nightmares", "Severe anxiety", "Uncontrollable thoughts", "Avoidance behaviors", "Hypervigilance", "Mood changes"],
    resources: ["Trauma-focused therapy", "EMDR", "Cognitive processing therapy", "Support groups", "Medication"],
    prevalence: "3.6% of US adults",
    treatment: "Highly treatable with specialized therapy approaches"
  },
  {
    title: "Obsessive-Compulsive Disorder (OCD)",
    description: "A chronic disorder involving unwanted, recurring thoughts (obsessions) and repetitive behaviors (compulsions).",
    symptoms: ["Obsessive thoughts", "Compulsive behaviors", "Fear of contamination", "Need for symmetry", "Intrusive thoughts", "Ritualistic behaviors"],
    resources: ["Exposure and Response Prevention", "Cognitive therapy", "Medication", "Support groups", "Family education"],
    prevalence: "1.2% of US adults",
    treatment: "Effective treatment available with specialized therapy"
  },
  {
    title: "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    description: "A neurodevelopmental disorder characterized by inattention, hyperactivity, and impulsivity. Often begins in childhood but can persist into adulthood.",
    symptoms: ["Inattention", "Hyperactivity", "Impulsivity", "Difficulty focusing", "Restlessness", "Poor time management", "Forgetfulness"],
    resources: ["Behavioral therapy", "Medication", "Skills training", "Educational support", "Parent training"],
    prevalence: "4.4% of US adults",
    treatment: "Highly manageable with appropriate treatment and accommodations"
  },
  {
    title: "Eating Disorders",
    description: "Serious mental health conditions characterized by severe disturbances in eating behaviors and related thoughts and emotions.",
    symptoms: ["Severe restriction of food", "Binge eating", "Purging behaviors", "Body image distortion", "Preoccupation with weight", "Secretive eating"],
    resources: ["Specialized eating disorder treatment", "Nutritional counseling", "Family therapy", "Support groups", "Medical monitoring"],
    prevalence: "9% of US population",
    treatment: "Recovery possible with comprehensive treatment approach"
  },
  {
    title: "Schizophrenia",
    description: "A serious mental disorder that affects how a person thinks, feels, and behaves. Often involves psychosis and can be highly treatable.",
    symptoms: ["Hallucinations", "Delusions", "Disorganized thinking", "Reduced emotional expression", "Social withdrawal", "Cognitive difficulties"],
    resources: ["Antipsychotic medication", "Psychosocial therapy", "Family support", "Supported employment", "Peer support"],
    prevalence: "0.3% of US adults",
    treatment: "Manageable with proper treatment and support"
  },
  {
    title: "Borderline Personality Disorder (BPD)",
    description: "A mental health condition characterized by unstable moods, behavior, and relationships. Often involves intense emotional experiences.",
    symptoms: ["Intense mood swings", "Fear of abandonment", "Unstable relationships", "Impulsive behavior", "Self-harm", "Identity disturbance"],
    resources: ["Dialectical Behavior Therapy", "Schema therapy", "Mentalization-based therapy", "Support groups", "Family therapy"],
    prevalence: "1.4% of US adults",
    treatment: "Highly treatable with specialized therapy approaches"
  },
  {
    title: "Substance Use Disorders",
    description: "A mental health condition where the use of alcohol or drugs leads to significant impairment or distress. Often co-occurs with other mental health conditions.",
    symptoms: ["Cravings", "Loss of control", "Continued use despite problems", "Withdrawal symptoms", "Tolerance", "Neglecting responsibilities"],
    resources: ["Detoxification", "Rehabilitation programs", "12-step programs", "Medication-assisted treatment", "Counseling"],
    prevalence: "20.4% of US adults",
    treatment: "Recovery possible with comprehensive treatment and ongoing support"
  }
];

export const helplines = [
  { name: "National Suicide & Crisis Lifeline", number: "988", type: "24/7 Crisis Support" },
  { name: "Crisis Text Line", number: "Text HOME to 741741", type: "24/7 Text Support" },
  { name: "SAMHSA Treatment Referral", number: "1-800-662-4357", type: "Substance Abuse & Mental Health" },
  { name: "NAMI Helpline", number: "1-800-950-NAMI", type: "Mental Health Information & Support" }
];

// Local helplines by zip code regions
export const localHelplines = {
  "10001-10299": { // New York, NY
    city: "New York, NY",
    helplines: [
      { name: "NYC Well", number: "1-888-692-9355", type: "24/7 Mental Health Support", description: "Free, confidential mental health support for NYC residents" },
      { name: "NYC Crisis Prevention", number: "1-800-LIFENET", type: "Crisis Support", description: "Crisis intervention and suicide prevention" },
      { name: "NYC Department of Health", number: "311", type: "Mental Health Resources", description: "City services and mental health referrals" }
    ]
  },
  "90001-90899": { // Los Angeles, CA
    city: "Los Angeles, CA",
    helplines: [
      { name: "LA County Mental Health", number: "1-800-854-7771", type: "24/7 Crisis Support", description: "Los Angeles County mental health crisis line" },
      { name: "LA Warm Line", number: "1-855-952-9276", type: "Peer Support", description: "Non-crisis emotional support and resources" },
      { name: "LA County 211", number: "211", type: "Resource Referral", description: "Information and referral for health and human services" }
    ]
  },
  "60601-60699": { // Chicago, IL
    city: "Chicago, IL",
    helplines: [
      { name: "Chicago Crisis Line", number: "1-800-273-8255", type: "24/7 Crisis Support", description: "Crisis intervention and suicide prevention" },
      { name: "Chicago Mental Health", number: "312-747-1020", type: "Mental Health Services", description: "City mental health services and referrals" },
      { name: "Illinois Warm Line", number: "1-866-359-7953", type: "Peer Support", description: "Peer support and recovery resources" }
    ]
  },
  "77001-77299": { // Houston, TX
    city: "Houston, TX",
    helplines: [
      { name: "Harris County Crisis", number: "1-800-273-8255", type: "24/7 Crisis Support", description: "Crisis intervention and mental health support" },
      { name: "Houston Area Women's Center", number: "713-528-2121", type: "Crisis Support", description: "Crisis intervention and counseling services" },
      { name: "Texas 211", number: "211", type: "Resource Referral", description: "Health and human services information" }
    ]
  },
  "85001-85099": { // Phoenix, AZ
    city: "Phoenix, AZ",
    helplines: [
      { name: "Arizona Crisis Line", number: "1-800-631-1314", type: "24/7 Crisis Support", description: "Statewide crisis intervention services" },
      { name: "Maricopa County Crisis", number: "602-222-9444", type: "Crisis Support", description: "Local crisis intervention and support" },
      { name: "Arizona 211", number: "211", type: "Resource Referral", description: "Community resources and services" }
    ]
  },
  "33101-33199": { // Miami, FL
    city: "Miami, FL",
    helplines: [
      { name: "Miami-Dade Crisis", number: "1-800-273-8255", type: "24/7 Crisis Support", description: "Crisis intervention and suicide prevention" },
      { name: "Miami-Dade 211", number: "211", type: "Resource Referral", description: "Health and human services information" },
      { name: "Florida Crisis Line", number: "1-800-273-8255", type: "Crisis Support", description: "Statewide crisis intervention" }
    ]
  },
  "98101-98199": { // Seattle, WA
    city: "Seattle, WA",
    helplines: [
      { name: "King County Crisis", number: "1-800-273-8255", type: "24/7 Crisis Support", description: "Crisis intervention and mental health support" },
      { name: "Seattle Crisis Line", number: "206-461-3222", type: "Crisis Support", description: "Local crisis intervention services" },
      { name: "Washington 211", number: "211", type: "Resource Referral", description: "Community resources and services" }
    ]
  },
  "02101-02199": { // Boston, MA
    city: "Boston, MA",
    helplines: [
      { name: "Massachusetts Crisis", number: "1-800-273-8255", type: "24/7 Crisis Support", description: "Statewide crisis intervention services" },
      { name: "Boston Emergency Services", number: "1-800-981-4357", type: "Crisis Support", description: "Emergency mental health services" },
      { name: "Massachusetts 211", number: "211", type: "Resource Referral", description: "Health and human services information" }
    ]
  },
  "30301-30399": { // Atlanta, GA
    city: "Atlanta, GA",
    helplines: [
      { name: "Georgia Crisis Line", number: "1-800-273-8255", type: "24/7 Crisis Support", description: "Crisis intervention and suicide prevention" },
      { name: "Atlanta Crisis Center", number: "404-873-1766", type: "Crisis Support", description: "Local crisis intervention services" },
      { name: "Georgia 211", number: "211", type: "Resource Referral", description: "Community resources and services" }
    ]
  },
  "80201-80299": { // Denver, CO
    city: "Denver, CO",
    helplines: [
      { name: "Colorado Crisis Line", number: "1-844-493-8255", type: "24/7 Crisis Support", description: "Statewide crisis intervention services" },
      { name: "Denver Crisis Center", number: "303-860-1200", type: "Crisis Support", description: "Local crisis intervention and support" },
      { name: "Colorado 211", number: "211", type: "Resource Referral", description: "Health and human services information" }
    ]
  }
};

// Function to find local helplines by zip code
export const findLocalHelplines = (zipCode) => {
  const zip = parseInt(zipCode);
  if (isNaN(zip)) return null;
  
  for (const [range, data] of Object.entries(localHelplines)) {
    const [start, end] = range.split('-').map(Number);
    if (zip >= start && zip <= end) {
      return data;
    }
  }
  
  // Default to national helplines if no local match
  return {
    city: "National Resources",
    helplines: helplines.map(h => ({ ...h, description: "Available nationwide" }))
  };
};

export const testimonials = [
  {
    name: "Sarah M.",
    story: "After struggling with anxiety for years, I finally reached out for help through this campaign's resources. The support groups and counseling changed my life.",
    condition: "Generalized Anxiety Disorder"
  },
  {
    name: "Michael R.",
    story: "The mood tracker helped me recognize patterns in my depression. Working with a counselor, I've learned coping strategies that actually work.",
    condition: "Major Depressive Disorder"
  },
  {
    name: "Jessica T.",
    story: "Finding this community made me feel less alone. Sharing my bipolar journey with others who understand has been incredibly healing.",
    condition: "Bipolar II Disorder"
  },
  {
    name: "David L.",
    story: "I was skeptical about online support at first, but the 24/7 crisis line saved my life during my darkest moment. I'm forever grateful.",
    condition: "Severe Depression"
  },
  {
    name: "Amanda K.",
    story: "The educational resources helped me understand my panic disorder. Knowledge gave me power to manage my symptoms and live fully again.",
    condition: "Panic Disorder"
  },
  {
    name: "Carlos R.",
    story: "As a veteran with PTSD, I struggled to connect with others. This platform's support forums connected me with people who truly understand.",
    condition: "PTSD"
  },
  {
    name: "Lisa Chen",
    story: "The appointment scheduler made it so easy to find a therapist who accepted my insurance. I started treatment within 48 hours.",
    condition: "Social Anxiety Disorder"
  },
  {
    name: "Robert J.",
    story: "After losing my job, depression hit hard. The community support and professional resources helped me get back on my feet.",
    condition: "Situational Depression"
  },
  {
    name: "Emily W.",
    story: "As a caregiver for someone with mental illness, these resources helped me understand how to support my loved one while taking care of myself.",
    condition: "Caregiver Support"
  },
  {
    name: "Marcus T.",
    story: "Breaking through the stigma was the hardest part. This campaign showed me that seeking help is strength, not weakness.",
    condition: "Bipolar I Disorder"
  },
  {
    name: "Priya S.",
    story: "The multilingual resources helped my parents understand my anxiety. Family support made all the difference in my recovery.",
    condition: "Anxiety and Depression"
  },
  {
    name: "James B.",
    story: "I've been in recovery for 3 years now. The ongoing support from this community keeps me motivated and accountable every day.",
    condition: "Depression and Substance Use"
  }
];

export const blogPosts = [
  {
    title: "Understanding Anxiety: More Than Just Worry",
    excerpt: "Learn the difference between normal anxiety and anxiety disorders, and discover effective coping strategies.",
    content: `Anxiety is a natural human emotion that serves as our body's alarm system, alerting us to potential threats and helping us prepare for challenges. However, when anxiety becomes overwhelming, persistent, and interferes with daily life, it may indicate an anxiety disorder affecting over 40 million adults in the United States alone.

## The Spectrum of Anxiety

**Normal Anxiety** is a healthy response to stress that helps us stay alert and focused. It's temporary, proportional to the situation, and doesn't significantly impair daily functioning.

**Anxiety Disorders** are characterized by excessive, persistent worry that's disproportionate to the actual threat and interferes with daily activities. Common types include:

- **Generalized Anxiety Disorder (GAD)**: Chronic worry about everyday concerns
- **Panic Disorder**: Recurrent panic attacks with intense physical symptoms
- **Social Anxiety Disorder**: Extreme fear of social situations and judgment
- **Specific Phobias**: Intense fear of particular objects or situations
- **Agoraphobia**: Fear of being in situations where escape might be difficult

## Recognizing the Signs

Physical symptoms may include:
- Rapid heartbeat, sweating, trembling
- Shortness of breath, chest tightness
- Nausea, dizziness, headaches
- Muscle tension, fatigue
- Sleep disturbances

Emotional and cognitive symptoms:
- Excessive worry and rumination
- Irritability and restlessness
- Difficulty concentrating
- Catastrophic thinking
- Avoidance behaviors

## Evidence-Based Coping Strategies

**Breathing Techniques:**
- **4-7-8 Breathing**: Inhale for 4 counts, hold for 7, exhale for 8
- **Box Breathing**: 4 counts in, hold, out, hold (equal timing)
- **Diaphragmatic Breathing**: Focus on belly expansion

**Cognitive Behavioral Techniques:**
- **Thought Challenging**: Question the validity of anxious thoughts
- **Reality Testing**: Examine evidence for and against worries
- **Reframing**: Shift perspective from threat to challenge

**Lifestyle Modifications:**
- Regular exercise (30 minutes, 3-5 times weekly)
- Balanced nutrition with omega-3 fatty acids
- Consistent sleep schedule (7-9 hours nightly)
- Limit caffeine and alcohol intake
- Practice mindfulness and meditation

## When to Seek Professional Help

Consider professional support if anxiety:
- Persists for more than 6 months
- Significantly impacts work, relationships, or daily activities
- Causes physical symptoms that interfere with functioning
- Leads to substance use or other unhealthy coping mechanisms
- Includes panic attacks or avoidance behaviors

## Treatment Options

**Therapy Approaches:**
- **Cognitive Behavioral Therapy (CBT)**: Most effective for anxiety disorders
- **Exposure Therapy**: Gradual, controlled exposure to feared situations
- **Mindfulness-Based Stress Reduction (MBSR)**: Meditation and awareness techniques
- **Acceptance and Commitment Therapy (ACT)**: Focus on values and acceptance

**Medication Options:**
- Selective Serotonin Reuptake Inhibitors (SSRIs)
- Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)
- Benzodiazepines (short-term use)
- Beta-blockers for physical symptoms

## Building Your Support System

- **Professional Support**: Therapists, psychiatrists, counselors
- **Peer Support**: Support groups, online communities
- **Family and Friends**: Educate them about anxiety
- **Self-Help Resources**: Books, apps, online programs

Remember, anxiety disorders are highly treatable, and seeking help is a sign of strength, not weakness. With proper treatment and support, most people with anxiety disorders can lead fulfilling, productive lives.`,
    author: "Dr. Sarah Mitchell, Clinical Psychologist",
    date: "March 15, 2026",
    readTime: "12 min read",
    category: "Education"
  },
  {
    title: "The Importance of Self-Care in Mental Health",
    excerpt: "Explore practical self-care techniques that can complement professional mental health treatment.",
    content: `Self-care isn't selfish—it's essential for mental health. In our fast-paced world, taking time to nurture ourselves often falls to the bottom of our priority list. However, research consistently shows that regular self-care practices significantly improve mental health outcomes, reduce stress, and enhance overall well-being.

## What is Self-Care?

Self-care encompasses any intentional activity we do to care for our physical, mental, and emotional health. It's not about indulgence or luxury—it's about meeting our basic human needs for rest, nourishment, connection, and personal growth.

## The Science Behind Self-Care

Studies demonstrate that self-care practices:
- Reduce cortisol levels (stress hormone) by up to 23%
- Improve sleep quality and duration
- Boost immune system function
- Enhance emotional regulation
- Increase resilience to stress and adversity
- Improve relationships and social connections

## Physical Self-Care

**Exercise and Movement:**
- **Aerobic Exercise**: 30 minutes daily can reduce anxiety and depression symptoms by 25-30%
- **Strength Training**: Builds confidence and releases endorphins
- **Yoga and Stretching**: Reduces muscle tension and promotes mindfulness
- **Walking in Nature**: Decreases rumination and improves mood

**Nutrition and Hydration:**
- **Balanced Diet**: Focus on whole foods, lean proteins, complex carbohydrates
- **Omega-3 Fatty Acids**: Found in fish, nuts, seeds—linked to reduced depression
- **Hydration**: 8-10 glasses of water daily for optimal brain function
- **Limit Processed Foods**: Reduce inflammation and mood swings

**Sleep Hygiene:**
- **Consistent Schedule**: Go to bed and wake up at the same time daily
- **Sleep Environment**: Cool, dark, quiet room
- **Wind-Down Routine**: 30-60 minutes of relaxing activities before bed
- **Limit Screen Time**: Avoid blue light 1-2 hours before sleep

## Emotional Self-Care

**Mindfulness and Meditation:**
- **Daily Practice**: Even 10 minutes can reduce stress and improve focus
- **Mindful Breathing**: 4-7-8 breathing technique for anxiety relief
- **Body Scan**: Progressive relaxation technique
- **Loving-Kindness Meditation**: Cultivates compassion and self-acceptance

**Emotional Expression:**
- **Journaling**: Write about thoughts, feelings, and experiences
- **Creative Outlets**: Art, music, writing, dancing
- **Talking to Trusted Friends**: Share feelings and experiences
- **Therapy or Counseling**: Professional support for deeper work

## Mental Self-Care

**Learning and Growth:**
- **Read Books**: Fiction for escapism, non-fiction for growth
- **Take Courses**: Online or in-person learning opportunities
- **Practice New Skills**: Hobbies that challenge and engage you
- **Set Goals**: Personal and professional development

**Digital Wellness:**
- **Screen Time Limits**: Set boundaries on social media and news consumption
- **Digital Detox**: Regular breaks from technology
- **Curate Your Feed**: Follow accounts that inspire and educate
- **Mindful Technology Use**: Be intentional about when and how you use devices

## Social Self-Care

**Meaningful Connections:**
- **Quality Time**: Spend time with people who uplift and support you
- **Set Boundaries**: Learn to say no to draining relationships
- **Join Communities**: Find groups that share your interests or values
- **Volunteer**: Helping others can boost your own mental health

**Communication Skills:**
- **Assertive Communication**: Express needs and boundaries clearly
- **Active Listening**: Practice being fully present in conversations
- **Conflict Resolution**: Learn healthy ways to address disagreements
- **Seek Support**: Don't hesitate to ask for help when needed

## Spiritual Self-Care

**Purpose and Meaning:**
- **Reflect on Values**: What matters most to you?
- **Practice Gratitude**: Daily gratitude journaling or meditation
- **Connect with Nature**: Spend time outdoors regularly
- **Engage in Spiritual Practices**: Prayer, meditation, or other meaningful rituals

## Building a Sustainable Self-Care Routine

**Start Small:**
- Choose 1-2 practices to begin with
- Commit to 5-10 minutes daily
- Gradually increase time and add new practices
- Be patient and kind with yourself

**Make it Personal:**
- Choose activities you genuinely enjoy
- Adapt practices to fit your lifestyle
- Experiment with different approaches
- Adjust as your needs change

**Track Your Progress:**
- Keep a self-care journal
- Note how different practices affect your mood
- Celebrate small wins and improvements
- Adjust your routine based on what works

## Common Self-Care Barriers

**Time Constraints:**
- Start with micro-practices (2-5 minutes)
- Combine self-care with existing routines
- Schedule it like any other important appointment
- Remember: self-care saves time by improving efficiency

**Guilt and Shame:**
- Reframe self-care as necessary, not selfish
- Remember you can't pour from an empty cup
- Model healthy behavior for others
- Seek support if guilt persists

**Financial Concerns:**
- Many self-care practices are free or low-cost
- Focus on activities that don't require money
- Invest in your well-being as you would your physical health
- Look for community resources and free programs

## When Self-Care Isn't Enough

While self-care is powerful, it's not a substitute for professional help when needed. Seek professional support if you experience:
- Persistent feelings of sadness or hopelessness
- Severe anxiety that interferes with daily life
- Thoughts of self-harm or suicide
- Substance use to cope with emotions
- Inability to function in work, school, or relationships

Remember, self-care is a journey, not a destination. Be patient, compassionate, and flexible as you develop practices that support your unique mental health needs.`,
    author: "Jennifer Martinez, LCSW",
    date: "March 10, 2026",
    readTime: "15 min read",
    category: "Wellness"
  },
  {
    title: "Breaking the Stigma: Talking About Mental Health",
    excerpt: "How open conversations about mental health can help reduce stigma and encourage others to seek help.",
    content: "Mental health stigma prevents millions from seeking help. This powerful piece explores the roots of mental health stigma, its impact on individuals and society, and practical ways we can all contribute to breaking down these barriers through open, compassionate conversations.",
    author: "Marcus Johnson, Mental Health Advocate",
    date: "March 5, 2026",
    readTime: "6 min read",
    category: "Advocacy"
  },
  {
    title: "Recognizing Depression in Yourself and Others",
    excerpt: "Understanding the signs of depression and knowing when to reach out for support.",
    content: "Depression affects over 280 million people worldwide. Learn to recognize the symptoms of depression, from persistent sadness to changes in sleep and appetite. Discover how to support loved ones and when professional intervention is necessary.",
    author: "Dr. Emily Chen, Psychiatrist",
    date: "March 1, 2026",
    readTime: "7 min read",
    category: "Education"
  },
  {
    title: "Mindfulness Meditation for Anxiety Relief",
    excerpt: "A beginner's guide to using mindfulness techniques to manage anxiety symptoms.",
    content: "Mindfulness meditation has been proven effective in reducing anxiety symptoms. This step-by-step guide teaches you simple mindfulness practices you can start today, including body scan meditation, mindful breathing, and integrating mindfulness into daily activities.",
    author: "Lisa Thompson, Mindfulness Coach",
    date: "February 28, 2026",
    readTime: "5 min read",
    category: "Techniques"
  },
  {
    title: "The Connection Between Exercise and Mental Health",
    excerpt: "How physical activity can improve mood, reduce anxiety, and support overall mental wellness.",
    content: "Exercise is a powerful tool for mental health. Research shows regular physical activity can be as effective as medication for mild to moderate depression. Learn about the science behind exercise and mental health, and discover how to create an exercise routine that works for you.",
    author: "Robert Davis, Exercise Physiologist",
    date: "February 25, 2026",
    readTime: "6 min read",
    category: "Wellness"
  },
  {
    title: "Supporting a Loved One with Mental Illness",
    excerpt: "Practical advice for family members and friends of those experiencing mental health challenges.",
    content: "Supporting someone with mental illness can be challenging. This guide offers practical strategies for providing effective support while maintaining your own mental health, including communication tips, setting boundaries, and knowing when to seek professional help.",
    author: "Amanda Wilson, Family Therapist",
    date: "February 20, 2026",
    readTime: "8 min read",
    category: "Support"
  },
  {
    title: "Understanding Bipolar Disorder: Myths vs. Facts",
    excerpt: "Separating fact from fiction about bipolar disorder and its treatment options.",
    content: "Bipolar disorder is often misunderstood. This article debunks common myths, explains the different types of bipolar disorder, and discusses modern treatment approaches including medication, therapy, and lifestyle management.",
    author: "Dr. James Park, Psychiatrist",
    date: "February 15, 2026",
    readTime: "7 min read",
    category: "Education"
  },
  {
    title: "Crisis Intervention: What to Do When Someone is in Crisis",
    excerpt: "Essential guide to recognizing and responding to mental health crises.",
    content: "Knowing how to respond during a mental health crisis can save lives. Learn to recognize crisis warning signs, communicate effectively with someone in distress, and connect them with appropriate emergency resources including the 988 Suicide & Crisis Lifeline.",
    author: "Crisis Response Team",
    date: "February 10, 2026",
    readTime: "6 min read",
    category: "Crisis Support"
  },
  {
    title: "Building Resilience: Bouncing Back from Adversity",
    excerpt: "Develop mental resilience to better cope with life's challenges and setbacks.",
    content: "Resilience is the ability to adapt and bounce back from adversity. This article explores the key components of resilience, including social connections, self-care, purpose, and positive thinking, with practical exercises to build your resilience muscles.",
    author: "Dr. Patricia Garcia, Clinical Psychologist",
    date: "February 5, 2026",
    readTime: "5 min read",
    category: "Personal Growth"
  },
  {
    title: "Sleep and Mental Health: The Critical Connection",
    excerpt: "Understanding how sleep affects mental health and tips for better sleep hygiene.",
    content: "Sleep and mental health are intimately connected. Poor sleep can worsen mental health symptoms, while mental health conditions can disrupt sleep. Learn about this bidirectional relationship and discover evidence-based strategies for improving sleep quality.",
    author: "Dr. Michael Brown, Sleep Specialist",
    date: "January 30, 2026",
    readTime: "6 min read",
    category: "Wellness"
  },
  {
    title: "Therapy Options: Finding the Right Fit for You",
    excerpt: "Navigate the world of therapy with this guide to different therapeutic approaches.",
    content: "There's no one-size-fits-all approach to therapy. Explore various therapeutic modalities including CBT, DBT, psychodynamic therapy, and more. Learn how to find a therapist, what to expect in your first session, and how to know if therapy is working.",
    author: "Jennifer Lee, LMFT",
    date: "January 25, 2026",
    readTime: "8 min read",
    category: "Treatment"
  }
];
